import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  /* One of ROLES in @diagno/schemas (access.ts). */
  role: text('role').notNull().default('front_desk'),
  /* Disabled staff can't sign in, and their open sessions stop working. */
  isActive: boolean('is_active').notNull().default(true),
  /* Bumped on role, access, password or status changes: every token signed
     with an older number stops working at once. */
  sessionVersion: integer('session_version').notNull().default(0),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
