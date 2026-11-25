import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { employees } from './emplyoee';
import { patients } from './pateint';

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  bookingNumber: text('booking_number').notNull(),
  bookingItems: jsonb('booking_items').notNull().default({}),
  bookedBy: integer('booked_by').references(() => employees.id),
  bookingPatientId: integer('booking_patient_id').references(() => patients.id),
  bookingDate: timestamp('booking_date').notNull(),
  bookingTotal: integer('booking_total').notNull(),
  bookingStatus: text('booking_status').notNull(),
  bookingNotes: text('booking_notes'),
  bookingCreatedAt: timestamp('booking_created_at').notNull().defaultNow(),
  bookingUpdatedAt: timestamp('booking_updated_at').notNull().defaultNow(),
});
