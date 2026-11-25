import { employees } from './emplyoee';
import {
  pgTable,
  uuid,
  date,
  timestamp,
  decimal,
  text,
  pgEnum,
  integer,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const attendanceStatusEnum = pgEnum('attendance_status', [
  'present',
  'absent',
  'leave',
  'holiday',
  'weekend',
  'other',
]);

export const attendance = pgTable('attendance', {
  id: uuid('id').defaultRandom().primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id)
    .notNull(),
  date: date('date').notNull(),
  status: attendanceStatusEnum('status').notNull(),
  checkInAt: timestamp('check_in_at'),
  checkOutAt: timestamp('check_out_at'),
  checkInLat: decimal('check_in_lat', { precision: 10, scale: 7 }),
  checkInLng: decimal('check_in_lng', { precision: 10, scale: 7 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const leaveTypeEnum = pgEnum('leave_type', [
  'sick',
  'casual',
  'earned',
  'other',
]);

export const leaveStatusEnum = pgEnum('leave_status', [
  'pending',
  'approved',
  'rejected',
]);

export const leaveRequests = pgTable('leave_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id)
    .notNull(),
  leaveType: leaveTypeEnum('leave_type').notNull(),
  fromDate: date('from_date').notNull(),
  toDate: date('to_date').notNull(),
  reason: text('reason'),
  status: leaveStatusEnum('status').default('pending'),
  approvedBy: integer('approved_by').references(() => users.id),
  approvedAt: timestamp('approved_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
