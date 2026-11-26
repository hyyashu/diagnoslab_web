import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { and, desc, eq, gte, inArray, isNull, notInArray, sql } from 'drizzle-orm';
import { websiteTaps, leadEvents, leads, users } from '@diagno/db';
import type { WebsiteTapInput, LeadStatus, MatchTapInput } from '@diagno/schemas';
import { DrizzleService } from '../../db/drizzle.service';
import type { AccessUser } from '../../auth/access.service';
import { LeadsService } from './leads.service';
import { deriveAttribution, normalizePhone } from './lead-derive';

/* How far back the "to match" list goes. */
const OPEN_DAYS = 14;
/* An open enquiry from the same number within this window gets the tap
   instead of a new lead. */
const REUSE_DAYS = 30;
const CLOSED: LeadStatus[] = ['lost', 'spam', 'completed'];

@Injectable()
export class WebsiteTapsService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly leadsService: LeadsService,
  ) {}

  private get db() {
    return this.drizzleService.db;
  }

  /* From the website. Never fails loudly: a lost tap must not break the
     visitor's call or chat. A repeated ref code is ignored. */
  async record(dto: WebsiteTapInput) {
    const a = deriveAttribution(dto.source);
    const [row] = await this.db
      .insert(websiteTaps)
      .values({
        channel: dto.channel,
        refCode: dto.channel === 'whatsapp' ? (dto.refCode ?? null) : null,
        page: dto.page ?? null,
        clickId: a.clickId,
        clickIdType: a.clickIdType,
        source: dto.source ?? null,
      })
      .onConflictDoNothing()
      .returning({ id: websiteTaps.id });
    return { ok: true, id: row?.id ?? null };
  }

  /* Taps waiting to be matched (last two weeks), or a ref code lookup
     across everything. */
  async list(ref?: string) {
    const where = ref
      ? eq(websiteTaps.refCode, normalizeRef(ref))
      : and(
          isNull(websiteTaps.leadId),
          isNull(websiteTaps.dismissedAt),
          gte(websiteTaps.clickedAt, sql`now() - interval '${sql.raw(String(OPEN_DAYS))} days'`),
        );
    const rows = await this.db
      .select({ click: websiteTaps, leadName: leads.name, matchedByName: users.name })
      .from(websiteTaps)
      .leftJoin(leads, eq(leads.id, websiteTaps.leadId))
      .leftJoin(users, eq(users.id, websiteTaps.matchedBy))
      .where(where)
      .orderBy(desc(websiteTaps.clickedAt))
      .limit(200);
    return rows.map((r) => ({ ...withAttribution(r.click), leadName: r.leadName, matchedByName: r.matchedByName }));
  }

  /* Links a tap to the caller. Reuses their open enquiry if they have one
     from the last 30 days (adding the campaign and click ID if it had none),
     otherwise creates a lead from the visit. */
  async match(id: number, dto: MatchTapInput, user: AccessUser) {
    const phoneE164 = normalizePhone(dto.phone);
    if (!phoneE164) throw new BadRequestException('Enter a valid mobile number');

    const [click] = await this.db.select().from(websiteTaps).where(eq(websiteTaps.id, id)).limit(1);
    if (!click) throw new NotFoundException('Tap not found');
    if (click.leadId) throw new ConflictException('This tap is already matched');

    const [existing] = await this.db
      .select()
      .from(leads)
      .where(
        and(
          eq(leads.phoneE164, phoneE164),
          notInArray(leads.status, CLOSED),
          gte(leads.createdAt, sql`now() - interval '${sql.raw(String(REUSE_DAYS))} days'`),
        ),
      )
      .orderBy(desc(leads.createdAt))
      .limit(1);

    const source = (click.source ?? {}) as Record<string, string>;
    const leadId =
      existing?.id ??
      (
        await this.leadsService.createLead(
          {
            name: dto.name || undefined,
            phone: phoneE164,
            source: { ...source, via: click.channel === 'call' ? 'call_click' : 'whatsapp_click', clicked_page: click.page ?? '' },
          },
          user.id,
        )
      ).id;

    const now = new Date();
    return this.db.transaction(async (tx) => {
      const [claimed] = await tx
        .update(websiteTaps)
        .set({ leadId, matchedAt: now, matchedBy: user.id })
        .where(and(eq(websiteTaps.id, id), isNull(websiteTaps.leadId)))
        .returning({ id: websiteTaps.id });
      if (!claimed) throw new ConflictException('This tap is already matched');

      const lead = existing ?? (await tx.select().from(leads).where(eq(leads.id, leadId)).then((r) => r[0]));
      const changes: Partial<typeof leads.$inferInsert> = {
        updatedAt: now,
        lastContactedAt: now,
        firstContactedAt: lead.firstContactedAt ?? now,
        contactAttempts: lead.contactAttempts + 1,
      };
      /* An existing enquiry without ad data takes the visit's. */
      if (existing && !existing.clickId && click.clickId) {
        const a = deriveAttribution(source);
        Object.assign(changes, {
          channel: a.channel,
          isPaid: a.isPaid,
          campaign: existing.campaign ?? a.campaign,
          keyword: existing.keyword ?? a.keyword,
          landingPage: existing.landingPage ?? a.landingPage,
          clickId: a.clickId,
          clickIdType: a.clickIdType,
          /* Keeps every click ID of that visit (gclid + gbraid/wbraid) for the Google Ads sheet. */
          source: {
            ...((existing.source ?? {}) as Record<string, unknown>),
            ...Object.fromEntries(['gclid', 'gbraid', 'wbraid'].filter((k) => source[k]).map((k) => [k, source[k]])),
          },
        });
      }
      if (lead.status === 'new' || lead.status === 'no_answer') {
        changes.status = 'contacted';
        await tx.insert(leadEvents).values({
          leadId,
          userId: user.id,
          type: 'status_change',
          data: { from: lead.status, to: 'contacted', auto: true },
        });
      }
      await tx.insert(leadEvents).values({
        leadId,
        userId: user.id,
        type: click.channel,
        outcome: click.channel === 'call' ? 'answered' : null,
        note: `${click.channel === 'call' ? 'Called' : 'WhatsApped'} us after tapping ${click.channel === 'call' ? 'Call' : 'WhatsApp'} on ${click.page ?? 'the website'}`,
        data: { websiteTapId: id, inbound: true, refCode: click.refCode },
      });
      await tx.update(leads).set(changes).where(eq(leads.id, leadId));
      return { leadId, reused: !!existing };
    });
  }

  async dismiss(id: number) {
    const [row] = await this.db
      .update(websiteTaps)
      .set({ dismissedAt: new Date() })
      .where(and(eq(websiteTaps.id, id), isNull(websiteTaps.leadId)))
      .returning({ id: websiteTaps.id });
    if (!row) throw new NotFoundException('Tap not found or already matched');
    return row;
  }

  /* For the lead page: the taps that led to this lead. */
  async forLeads(leadIds: number[]) {
    if (!leadIds.length) return [];
    const rows = await this.db.select().from(websiteTaps).where(inArray(websiteTaps.leadId, leadIds));
    return rows.map(withAttribution);
  }
}

function normalizeRef(ref: string) {
  const code = ref.toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/^DL/, '');
  return `DL-${code}`;
}

/* Adds the readable channel and campaign the list shows. */
function withAttribution(click: typeof websiteTaps.$inferSelect) {
  const a = deriveAttribution(click.source);
  return { ...click, from: a.channel, isPaid: a.isPaid, campaign: a.campaign, landingPage: a.landingPage };
}
