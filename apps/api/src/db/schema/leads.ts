import {
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const leadStatus = pgEnum('lead_status', [
  'new',
  'contacted',
  'converted',
  'lost',
  'spam',
]);

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  phone: text('phone'),
  message: text('message'),
  source: jsonb('source'),
  status: leadStatus('status').default('new'),
  notes: text('notes'),
  welcomeSentAt: timestamp('welcome_sent_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
