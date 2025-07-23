import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatalogueModule } from './catalogue/catalogue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    CommonModule,
    CatalogueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
