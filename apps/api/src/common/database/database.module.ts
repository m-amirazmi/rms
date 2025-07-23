import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database-connection';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// SCHEMAS
import * as catalogueAttributeSchema from 'src/catalogue/attribute/_schema';
import * as catalogueBrandSchema from 'src/catalogue/brand/_schema';
import * as catalogueCategorySchema from 'src/catalogue/category/_schema';
import * as catalogueModelSchema from 'src/catalogue/model/_schema';
import * as catalogueProductSchema from 'src/catalogue/product/_schema';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
        });
        return drizzle(pool, {
          schema: {
            ...catalogueAttributeSchema,
            ...catalogueBrandSchema,
            ...catalogueCategorySchema,
            ...catalogueModelSchema,
            ...catalogueProductSchema,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
