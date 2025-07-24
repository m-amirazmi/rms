import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/core/user/user.module';
import { UserService } from 'src/core/user/user.service';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
