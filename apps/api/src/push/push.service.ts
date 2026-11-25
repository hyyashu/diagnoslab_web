import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { and, eq, inArray, sql } from 'drizzle-orm';
import webpush from 'web-push';
import { webPushSubscriptions } from '@diagno/db';
import { DrizzleService } from '../db/drizzle.service';
import { AccessService } from '../auth/access.service';
import { LEAD_CREATED, type LeadCreatedPayload } from '../email/events/email.events';

export type PushMessage = { title: string; body: string; url: string; tag?: string };

/* Web push to the staff dashboard (installed app or browser tab). Needs
   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY and VAPID_SUBJECT; without them it
   logs once and sends nothing, so the rest of the API still runs. */
@Injectable()
export class PushService implements OnModuleInit {
  private readonly logger = new Logger(PushService.name);
  private enabled = false;

  constructor(
    private readonly drizzle: DrizzleService,
    private readonly access: AccessService,
  ) {}

  onModuleInit() {
    const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT } = process.env;
    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
      this.logger.warn('VAPID keys not set: push notifications are off');
      return;
    }
    webpush.setVapidDetails(VAPID_SUBJECT || 'mailto:info@diagnoslab.in', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    this.enabled = true;
  }

  publicKey() {
    return { publicKey: this.enabled ? process.env.VAPID_PUBLIC_KEY! : null };
  }

  async subscribe(endpoint: string, keys: { p256dh: string; auth: string }, userId: number, userAgent?: string) {
    const now = new Date();
    await this.drizzle.db
      .insert(webPushSubscriptions)
      .values({ endpoint, p256dh: keys.p256dh, auth: keys.auth, userId, userAgent, isActive: true, lastSeenAt: now })
      .onConflictDoUpdate({
        target: webPushSubscriptions.endpoint,
        set: { p256dh: keys.p256dh, auth: keys.auth, userId, userAgent, isActive: true, lastSeenAt: now, updatedAt: now },
      });
    return { subscribed: true };
  }

  async unsubscribe(endpoint: string) {
    await this.drizzle.db
      .update(webPushSubscriptions)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(webPushSubscriptions.endpoint, endpoint));
    return { subscribed: false };
  }

  /* Sends to every active device of these staff. Subscriptions the push
     service rejects as gone or not ours are switched off. */
  async sendTo(userIds: number[], message: PushMessage) {
    if (!this.enabled || !userIds.length) return { sent: 0 };
    const subs = await this.drizzle.db
      .select()
      .from(webPushSubscriptions)
      .where(and(eq(webPushSubscriptions.isActive, true), inArray(webPushSubscriptions.userId, userIds)));
    const body = JSON.stringify(message);
    const dead: number[] = [];
    let sent = 0;
    await Promise.all(
      subs.map(async (s) => {
        try {
          await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, body, {
            TTL: 60 * 60 * 6,
            urgency: 'high',
          });
          sent++;
        } catch (e) {
          const status = (e as { statusCode?: number }).statusCode;
          if (status && [401, 403, 404, 410].includes(status)) dead.push(s.id);
          else this.logger.warn(`Push failed (${status ?? 'network'}) for subscription ${s.id}`);
        }
      }),
    );
    if (dead.length) {
      await this.drizzle.db
        .update(webPushSubscriptions)
        .set({ isActive: false, updatedAt: new Date() })
        .where(sql`${webPushSubscriptions.id} in ${dead}`);
    }
    return { sent, removed: dead.length };
  }

  @OnEvent(LEAD_CREATED)
  async onLead(p: LeadCreatedPayload) {
    try {
      const what = [p.interestName, p.phone].filter(Boolean).join(' · ');
      const staff = await this.access.usersWith(['leads:read:all']);
      await this.sendTo(staff.map((u) => u.id), {
        title: `New lead: ${p.name?.trim() || 'No name'}`,
        body: what || 'Website enquiry',
        url: p.id ? `/leads?lead=${p.id}` : '/leads',
        tag: p.id ? `lead-${p.id}` : undefined,
      });
    } catch (e) {
      this.logger.error(`Lead push failed: ${e instanceof Error ? e.message : e}`);
    }
  }
}
