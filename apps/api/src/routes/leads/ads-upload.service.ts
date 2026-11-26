import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { createHash } from 'node:crypto';
import { and, eq, gte, inArray, isNotNull, isNull, or, sql } from 'drizzle-orm';
import { leadEvents, leads } from '@diagno/db';
import { DrizzleService } from '../../db/drizzle.service';
import { SheetWebhookClient } from '../../google/sheet-webhook.client';

export const LEAD_BOOKED = 'lead.booked';

/* Bookings to Google Ads, through a Google Sheet that Google Ads reads on a
   schedule (Goals > Conversions > Uploads > Schedule > Google Sheets).

   One row per booking, in one of two tabs:
   - CLICKS: bookings with a Google click ID (gclid).
   - PHONE_EMAIL: other Google Ads bookings (iPhone click IDs gbraid/wbraid, or
     an ad visit without a click ID), matched by Google on the hashed
     phone number and email ("enhanced conversions for leads").
   A booking goes in only one tab, so Google never counts it twice.
   Organic bookings are not sent.

   A booking is sent once: leads.conversion_sent_at is set when its row is
   written; a failure clears it and stores the reason in conversion_error,
   and the next run tries again. Runs when a lead is booked and every 15 min.
   Does nothing until GOOGLE_SHEET_WEBHOOK_URL and _SECRET are set (the
   sheet's Apps Script web app: apps/api/google-apps-script). */

const CLICKS = 'Google Ads - click IDs';
const PHONE_EMAIL = 'Google Ads - phone and email';
const PARAMS_ROW = ['Parameters:TimeZone=Asia/Calcutta'];
const HEADERS: Record<string, string[][]> = {
  [CLICKS]: [PARAMS_ROW, ['Google Click ID', 'Conversion Name', 'Conversion Time', 'Conversion Value', 'Conversion Currency']],
  [PHONE_EMAIL]: [PARAMS_ROW, ['Email', 'Phone Number', 'Conversion Name', 'Conversion Time', 'Conversion Value', 'Conversion Currency']],
};
/* Google Ads only accepts conversions within 90 days of the ad click. */
const MAX_AGE_DAYS = 90;
const EVERY_MS = 15 * 60 * 1000;

type Lead = typeof leads.$inferSelect;

@Injectable()
export class AdsUploadService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AdsUploadService.name);
  private readonly sheets: SheetWebhookClient | null;
  private readonly conversionName: string;
  private timer: NodeJS.Timeout | null = null;
  private running: Promise<void> | null = null;
  private again = false;
  private tabsReady = false;

  constructor(
    private readonly drizzleService: DrizzleService,
    config: ConfigService,
  ) {
    const url = config.get<string>('GOOGLE_SHEET_WEBHOOK_URL');
    const secret = config.get<string>('GOOGLE_SHEET_WEBHOOK_SECRET');
    this.sheets = url && secret ? new SheetWebhookClient(url, secret) : null;
    this.conversionName = config.get<string>('GOOGLE_ADS_CONVERSION_NAME') || 'Booked Patient';
  }

  onModuleInit() {
    if (!this.sheets) {
      this.logger.log('Google Ads sheet not set up (GOOGLE_SHEET_WEBHOOK_URL); bookings are not sent.');
      return;
    }
    this.timer = setInterval(() => void this.sync(), EVERY_MS);
    this.timer.unref();
    setTimeout(() => void this.sync(), 10_000).unref();
  }

  onModuleDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  @OnEvent(LEAD_BOOKED)
  onBooked() {
    void this.sync();
  }

  get enabled() {
    return !!this.sheets;
  }

  /* One run at a time. A booking that arrives during a run gets one more
     run straight after, so it is not left for the 15-minute timer. */
  sync(): Promise<void> {
    if (!this.sheets) return Promise.resolve();
    if (this.running) {
      this.again = true;
      return this.running;
    }
    this.running = (async () => {
      do {
        this.again = false;
        await this.run();
      } while (this.again);
    })().finally(() => (this.running = null));
    return this.running;
  }

  private async run() {
    const db = this.drizzleService.db;
    try {
      if (!this.tabsReady) {
        await this.sheets!.ensureTabs(HEADERS);
        this.tabsReady = true;
      }

      /* Claim the rows first, so a second container could never send them too. */
      const claimed = await db
        .update(leads)
        .set({ conversionSentAt: new Date(), conversionError: null })
        .where(
          and(
            isNull(leads.conversionSentAt),
            inArray(leads.status, ['booked', 'completed']),
            isNotNull(leads.bookedAt),
            gte(leads.createdAt, sql`now() - interval '${sql.raw(String(MAX_AGE_DAYS))} days'`),
            or(inArray(leads.clickIdType, ['gclid', 'gbraid', 'wbraid']), eq(leads.channel, 'google_ads')),
          ),
        )
        .returning();
      if (!claimed.length) return;

      const byTab: Record<string, { lead: Lead; row: (string | number)[] }[]> = { [CLICKS]: [], [PHONE_EMAIL]: [] };
      const skipped: Lead[] = [];
      for (const lead of claimed) {
        const out = this.row(lead);
        if (out) byTab[out.tab].push({ lead, row: out.row });
        else skipped.push(lead);
      }

      const unsent = new Set(Object.values(byTab).flatMap((items) => items.map((i) => i.lead.id)));
      for (const [tab, items] of Object.entries(byTab)) {
        if (!items.length) continue;
        try {
          await this.sheets!.append(tab, items.map((i) => i.row));
        } catch (e) {
          /* This tab and any not yet written go back for the next run. */
          await this.release([...unsent], String((e as Error).message ?? e));
          throw e;
        }
        items.forEach((i) => unsent.delete(i.lead.id));
        await db.insert(leadEvents).values(
          items.map(({ lead }) => ({
            leadId: lead.id,
            type: 'conversion_sent' as const,
            data: { tab, clickIdType: lead.clickIdType, value: lead.bookedAmount },
          })),
        );
      }

      if (skipped.length) {
        await this.release(
          skipped.map((l) => l.id),
          'No Google click ID, phone or email to send',
          true,
        );
      }
      this.logger.log(`Sent ${claimed.length - skipped.length} booking(s) to the Google Ads sheet.`);
    } catch (e) {
      this.logger.error(`Google Ads sheet: ${(e as Error).message}`);
    }
  }

  /* Puts claimed leads back for the next run, with the reason. `final`
     keeps them marked so they are not retried (nothing to send). */
  private async release(ids: number[], error: string, final = false) {
    await this.drizzleService.db
      .update(leads)
      .set({ conversionSentAt: final ? new Date() : null, conversionError: error.slice(0, 500) })
      .where(inArray(leads.id, ids));
  }

  private row(lead: Lead): { tab: string; row: (string | number)[] } | null {
    const time = istTime(lead.bookedAt!);
    const value = lead.bookedAmount ?? 0;
    if (lead.clickIdType === 'gclid' && lead.clickId) {
      return { tab: CLICKS, row: [lead.clickId, this.conversionName, time, value, 'INR'] };
    }
    const email = hashEmail(lead.email);
    const phone = lead.phoneE164 ? sha256(lead.phoneE164) : '';
    if (!email && !phone) return null;
    return { tab: PHONE_EMAIL, row: [email, phone, this.conversionName, time, value, 'INR'] };
  }
}

const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');

/* Google's rules: trim, lower case, and for Gmail drop dots before the @. */
function hashEmail(raw: string | null) {
  const email = raw?.trim().toLowerCase();
  if (!email || !email.includes('@')) return '';
  const [user, domain] = email.split('@');
  const normal = /^(gmail|googlemail)\.com$/.test(domain) ? `${user.replace(/\./g, '')}@${domain}` : email;
  return sha256(normal);
}

/* "2026-11-26 15:04:05" in India time, as the sheet's TimeZone row says. */
function istTime(d: Date) {
  return new Date(d.getTime() + 5.5 * 3600 * 1000).toISOString().slice(0, 19).replace('T', ' ');
}
