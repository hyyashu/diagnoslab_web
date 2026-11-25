import {
  pgTable,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';

export const doctors = pgTable('doctors', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  specialization: varchar('specialization', { length: 255 }),
  clinicName: varchar('clinic_name', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }),
  address: text('address'),
  area: varchar('area', { length: 100 }),
  pincode: varchar('pincode', { length: 10 }),
  isActive: boolean('is_active').default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
