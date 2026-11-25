import {
  pgTable,
  varchar,
  date,
  text,
  timestamp,
  jsonb,
  integer,
} from 'drizzle-orm/pg-core';
import { genderEnum } from './common';

export const patients = pgTable('patients', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  email: varchar('email', { length: 255 }),
  dob: date('dob'),
  gender: genderEnum('gender'),
  address: text('address'),
  pincode: varchar('pincode', { length: 10 }),
  familyMembers: jsonb('family_members'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
