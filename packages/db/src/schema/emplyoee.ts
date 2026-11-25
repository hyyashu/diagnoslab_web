import {
  pgTable,
  varchar,
  date,
  decimal,
  timestamp,
  integer,
  serial,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const employees = pgTable('employees', {
  id: integer('id').primaryKey(),
  userId: serial('user_id')
    .references(() => users.id)
    .notNull()
    .unique(),
  employeeCode: varchar('employee_code', { length: 50 }).unique(),
  designation: varchar('designation', { length: 100 }),
  department: varchar('department', { length: 100 }),
  joiningDate: date('joining_date'),
  salary: decimal('salary', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
