import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { productCategory } from '../category/_schema';

export const productBrand = pgTable('product_brands', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => productCategory.id, { onDelete: 'cascade' }),
});
