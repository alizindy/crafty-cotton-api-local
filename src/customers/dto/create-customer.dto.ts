import { User } from '@/users/entities/user.entity';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

export class CreateCustomerDto {
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
  @Length(9, 10) // Ensures the string length is between 9 and 10
  @Matches(/^\d{9,10}$/, { message: 'Phone number must be 9 to 10 digits' }) // Ensures it contains only digits
  phoneNumber?: string;

  @IsOptional()
  user: User;
}
