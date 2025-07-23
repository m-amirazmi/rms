import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';
import { productModel } from '../model/_schema';

export const product = pgTable('products', {
  id: serial('id').primaryKey(),
  sku: varchar('sku', { length: 100 }),
  modelId: integer('model_id')
    .notNull()
    .references(() => productModel.id, { onDelete: 'cascade' }),
});
