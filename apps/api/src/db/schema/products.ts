import { pgTable, serial, text, timestamp, decimal } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  productName: text('product_name').notNull(),
  productDescription: text('product_description'),
  productPrice: decimal('product_price').notNull(),
  productStatus: text('product_status').notNull(),
  productCreatedAt: timestamp('product_created_at').notNull().defaultNow(),
  productUpdatedAt: timestamp('product_updated_at').notNull().defaultNow(),
});
