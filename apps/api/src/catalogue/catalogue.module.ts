import { Module } from '@nestjs/common';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { ModelModule } from './model/model.module';
import { ProductModule } from './product/product.module';
import { AttributeModule } from './attribute/attribute.module';

@Module({
  imports: [
    BrandModule,
    CategoryModule,
    ModelModule,
    ProductModule,
    AttributeModule,
  ],
  exports: [
    BrandModule,
    CategoryModule,
    ModelModule,
    ProductModule,
    AttributeModule,
  ],
})
export class CatalogueModule {}
