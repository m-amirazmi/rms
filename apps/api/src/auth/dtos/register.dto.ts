import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsAlphanumeric()
  @IsString()
  @IsOptional()
  staffId: string;

  @IsNotEmpty()
  password: string;
}
