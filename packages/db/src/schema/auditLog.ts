import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const auditLog = pgTable('audit_log', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(), // created, updated, deleted, status_changed
  entityType: varchar('entity_type', { length: 100 }).notNull(), // booking, lead, patient
  entityId: integer('entity_id').notNull(),
  oldValue: jsonb('old_value'),
  newValue: jsonb('new_value'),
  ipAddress: varchar('ip_address', { length: 50 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
});
