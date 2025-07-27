import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  @IsOptional()
  email?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
