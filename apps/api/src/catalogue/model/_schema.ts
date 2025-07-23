import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';
import { productBrand } from '../brand/_schema';

export const productModel = pgTable('product_models', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  brandId: integer('brand_id')
    .notNull()
    .references(() => productBrand.id, { onDelete: 'cascade' }),
});
