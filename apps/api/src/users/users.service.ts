import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/common/database/database-connection';
import * as schema from './users.schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async getUsers() {
    return this.database.query.users.findMany();
  }

  async createUser(user: typeof schema.users.$inferInsert) {
    await this.database.insert(schema.users).values(user);
  }
}
