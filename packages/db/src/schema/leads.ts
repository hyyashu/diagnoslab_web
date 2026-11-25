import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users';

/* Lead pipeline. `contacted` = spoke to them, not booked yet.
   (`converted` was renamed to `booked` in migration 0002.) */
export const leadStatus = pgEnum('lead_status', [
  'new',
  'contacted',
  'booked',
  'lost',
  'spam',
  'no_answer',
  'completed',
]);

export const leadLostReason = pgEnum('lead_lost_reason', [
  'price',
  'distance',
  'booked_elsewhere',
  'not_needed',
  'unreachable',
  'other',
]);

/* Where the lead came from, worked out from `source` when it is saved. */
export const leadChannel = pgEnum('lead_channel', [
  'google_ads',
  'meta_ads',
  'google_search',
  'other_search',
  'social',
  'referral',
  'direct',
  'whatsapp',
  'phone',
  'walk_in',
  'other',
]);

export const leadInterestKind = pgEnum('lead_interest_kind', ['test', 'package', 'scan', 'general']);

/* One row per phone number, so repeat enquiries belong to one person. */
export const people = pgTable('people', {
  id: serial('id').primaryKey(),
  name: text('name'),
  phoneE164: text('phone_e164').notNull().unique(),
  email: text('email'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/* One row per enquiry. Its current state lives here; what happened over
   time lives in lead_activities. */
export const leads = pgTable(
  'leads',
  {
    id: serial('id').primaryKey(),
    personId: integer('person_id').references(() => people.id, { onDelete: 'set null' }),

    /* As typed on the form. */
    name: text('name'),
    email: text('email'),
    phone: text('phone'),
    phoneE164: text('phone_e164'),
    message: text('message'),

    /* Pipeline */
    status: leadStatus('status').notNull().default('new'),
    lostReason: leadLostReason('lost_reason'),
    assignedTo: integer('assigned_to').references(() => users.id, { onDelete: 'set null' }),
    firstContactedAt: timestamp('first_contacted_at', { withTimezone: true }),
    lastContactedAt: timestamp('last_contacted_at', { withTimezone: true }),
    contactAttempts: integer('contact_attempts').notNull().default(0),

    /* What they looked at on the website, and the price they saw (₹). */
    interestKind: leadInterestKind('interest_kind'),
    interestName: text('interest_name'),
    interestPrice: integer('interest_price'),

    /* What they actually booked (₹, whole rupees). */
    bookedAt: timestamp('booked_at', { withTimezone: true }),
    bookedItems: jsonb('booked_items').$type<{ name: string; price: number }[]>(),
    bookedAmount: integer('booked_amount'),

    /* Attribution */
    channel: leadChannel('channel').notNull().default('other'),
    isPaid: boolean('is_paid').notNull().default(false),
    campaign: text('campaign'),
    keyword: text('keyword'),
    landingPage: text('landing_page'),
    clickId: text('click_id'),
    clickIdType: text('click_id_type'),
    conversionSentAt: timestamp('conversion_sent_at', { withTimezone: true }),
    conversionError: text('conversion_error'),

    /* Everything the form sent, unchanged. */
    source: jsonb('source'),

    /* Kept for old data; new notes go to lead_activities. */
    notes: text('notes'),
    welcomeSentAt: timestamp('welcome_sent_at'),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('leads_status_created_idx').on(t.status, t.createdAt.desc()),
    index('leads_phone_e164_idx').on(t.phoneE164),
    index('leads_person_idx').on(t.personId),
    index('leads_channel_created_idx').on(t.channel, t.createdAt.desc()),
    index('leads_assigned_idx').on(t.assignedTo),
  ],
);

export const leadActivityType = pgEnum('lead_activity_type', [
  'created',
  'call',
  'whatsapp',
  'note',
  'status_change',
  'assigned',
  'task_created',
  'task_done',
  'booked',
  'conversion_sent',
]);

export const callOutcome = pgEnum('call_outcome', [
  'answered',
  'no_answer',
  'busy',
  'switched_off',
  'wrong_number',
]);

/* The timeline: one row per thing that happened to a lead. */
export const leadActivities = pgTable(
  'lead_activities',
  {
    id: serial('id').primaryKey(),
    leadId: integer('lead_id')
      .notNull()
      .references(() => leads.id, { onDelete: 'cascade' }),
    /* Empty for automatic entries (form submitted, conversion sent). */
    userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
    type: leadActivityType('type').notNull(),
    outcome: callOutcome('outcome'),
    note: text('note'),
    data: jsonb('data'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('lead_activities_lead_created_idx').on(t.leadId, t.createdAt)],
);

/* Follow-ups: "call Ravi back tomorrow 10 AM". */
export const tasks = pgTable(
  'tasks',
  {
    id: serial('id').primaryKey(),
    leadId: integer('lead_id')
      .notNull()
      .references(() => leads.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    dueAt: timestamp('due_at', { withTimezone: true }).notNull(),
    assignedTo: integer('assigned_to').references(() => users.id, { onDelete: 'set null' }),
    createdBy: integer('created_by').references(() => users.id, { onDelete: 'set null' }),
    doneAt: timestamp('done_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('tasks_open_due_idx').on(t.doneAt, t.dueAt), index('tasks_lead_idx').on(t.leadId)],
);
