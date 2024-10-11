import { User } from '@/users/entities/user.entity';
import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStaffDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  job?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsOptional()
  user: User;
}
