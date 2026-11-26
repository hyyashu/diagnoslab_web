import { index, integer, jsonb, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { leads } from './leads';
import { users } from './users';

export const websiteTapChannel = pgEnum('website_tap_channel', ['call', 'whatsapp']);

/* One row per tap on a Call or WhatsApp link on the website. A tap is
   anonymous until staff match it to the person who then called or
   messaged (by WhatsApp ref code, or by time against the call log); the
   lead then gets the visit's campaign and Google click ID. */
export const websiteTaps = pgTable(
  'website_taps',
  {
    id: serial('id').primaryKey(),
    channel: websiteTapChannel('channel').notNull(),
    /* WhatsApp only: the code put in the pre-typed message, e.g. DL-4K7P. */
    refCode: text('ref_code').unique(),
    clickedAt: timestamp('clicked_at', { withTimezone: true }).notNull().defaultNow(),
    /* The page the tap happened on (path only). */
    page: text('page'),
    clickId: text('click_id'),
    clickIdType: text('click_id_type'),
    /* The visit's attribution (UTMs, landing page, click IDs) and PostHog session. */
    source: jsonb('source'),
    leadId: integer('lead_id').references(() => leads.id, { onDelete: 'set null' }),
    matchedAt: timestamp('matched_at', { withTimezone: true }),
    matchedBy: integer('matched_by').references(() => users.id, { onDelete: 'set null' }),
    /* Hidden from the to-match list (misclick, never called). */
    dismissedAt: timestamp('dismissed_at', { withTimezone: true }),
  },
  (t) => [index('website_taps_clicked_idx').on(t.clickedAt.desc()), index('website_taps_lead_idx').on(t.leadId)],
);
