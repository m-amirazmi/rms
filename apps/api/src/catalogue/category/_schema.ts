import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const productCategory = pgTable('product_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
});
