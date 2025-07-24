import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  imports: [DatabaseModule],
})
export class UserModule {}
