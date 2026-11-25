import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { bookings } from './booking';
import { users } from './users';

export const billing = pgTable('billing', {
  id: serial('id').primaryKey(),
  billingNumber: text('billing_number').notNull(),
  billingDate: timestamp('billing_date').notNull(),
  billingAmount: integer('billing_amount').notNull(),
  billingStatus: text('billing_status').notNull(),
  billingNotes: text('billing_notes'),
  bookingId: integer('booking_id').references(() => bookings.id),
  paymentMethod: text('payment_method').notNull(),
  paymentStatus: text('payment_status').notNull(),
  paymentReference: text('payment_reference'),
  createdBy: integer('created_by').references(() => users.id),
  updatedBy: integer('updated_by').references(() => users.id),
  updatedAt: timestamp('updated_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});
