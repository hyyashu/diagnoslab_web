import {
  jsonb,
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  serial,
  integer,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const notificationChannelEnum = pgEnum('notification_channel', [
  'email',
  'whatsapp',
  'sms',
  'push',
]);

export const notificationStatusEnum = pgEnum('notification_status', [
  'pending',
  'sent',
  'delivered',
  'failed',
]);
export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: serial('user_id').references(() => users.id),
  title: varchar('title', { length: 255 }),
  body: text('body'),
  channel: notificationChannelEnum('channel').notNull(),
  status: notificationStatusEnum('status').default('pending'),
  referenceType: varchar('reference_type', { length: 50 }), // booking, lead, visit_log
  referenceId: integer('reference_id'),
  sentAt: timestamp('sent_at'),
  readAt: timestamp('read_at'),
  metadata: jsonb('metadata'), // flexible payload for external provider IDs
  createdAt: timestamp('created_at').defaultNow(),
});
