import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { doctors } from './doctors';
import { employees } from './emplyoee';

export const meetings = pgTable('meetings', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id)
    .notNull(),
  doctorId: integer('doctor_id')
    .references(() => doctors.id)
    .notNull(),
  meetingAt: timestamp('meeting_at').notNull(),
  scheduledBy: integer('scheduled_by'),
  meetingNotes: text('meeting_notes'),
  meetingStatus: text('meeting_status').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const meetingsDetails = pgTable('meetings_details', {
  id: serial('id').primaryKey(),
  meetingId: integer('meeting_id')
    .references(() => meetings.id)
    .notNull(),
  employeeId: integer('employee_id')
    .references(() => employees.id)
    .notNull(),
  doctorId: integer('doctor_id')
    .references(() => doctors.id)
    .notNull(),
  meetingType: varchar('meeting_type', { length: 100 }),
  meetingCheckInAt: timestamp('meeting_check_in_at').notNull(),
  meetingCheckInLocation: jsonb('meeting_check_in_location'),
  meetingCheckOutAt: timestamp('meeting_check_out_at'),
  meetingCheckOutLocation: jsonb('meeting_check_out_location'),
  meetingNotes: text('meeting_notes'),
});
