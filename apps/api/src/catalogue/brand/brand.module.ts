import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';

@Module({
  providers: [BrandService]
})
export class BrandModule {}
