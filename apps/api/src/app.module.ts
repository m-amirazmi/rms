import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';

console.log('process', process.env);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    CommonModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
