import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/common/database/database-connection';
import * as schema from './_schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  // For platform owners & tenant owners
  async getUserByEmail(email: string) {
    return this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1)
      .then((rows) => rows[0]);
  }
}
