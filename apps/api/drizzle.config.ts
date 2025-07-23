import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, `.env.dev`) });

export default defineConfig({
  schema: './src/**/*.schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
});
