import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

/* One row per browser or installed app that turned on notifications in the
   staff dashboard. The table predates Drizzle here, hence the camelCase
   column names. Rows are switched off (not deleted) when the browser says
   the subscription is gone. */
export const webPushSubscriptions = pgTable('web_push_subscriptions', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  endpoint: text('endpoint').notNull().unique(),
  p256dh: text('p256dh').notNull(),
  auth: text('auth').notNull(),
  userAgent: text('userAgent'),
  isActive: boolean('isActive').notNull().default(true),
  lastSeenAt: timestamp('lastSeenAt').notNull().defaultNow(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
