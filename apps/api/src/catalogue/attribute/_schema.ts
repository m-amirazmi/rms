import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';
import { productCategory } from '../category/_schema';
import { product } from '../product/_schema';

export const productAttribute = pgTable('product_attributes', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  type: varchar('type', { length: 20 }).notNull(), // e.g., 'text', 'number', 'select'
  categoryId: integer('category_id')
    .notNull()
    .references(() => productCategory.id, { onDelete: 'cascade' }),
});

export const productAttributeValue = pgTable('product_attribute_values', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .notNull()
    .references(() => product.id, { onDelete: 'cascade' }),
  attributeId: integer('attribute_id')
    .notNull()
    .references(() => productAttribute.id, { onDelete: 'cascade' }),
  value: varchar('value', { length: 255 }).notNull(),
});

export const productAttributeOption = pgTable('product_attribute_options', {
  id: serial('id').primaryKey(),
  attributeId: integer('attribute_id')
    .notNull()
    .references(() => productAttribute.id, { onDelete: 'cascade' }),
  value: varchar('value', { length: 100 }).notNull(),
});
