import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  @Length(9, 10) // Ensures the string length is between 9 and 10
  @Matches(/^\d{9,10}$/, { message: 'Phone number must be 9 to 10 digits' }) // Ensures it contains only digits
  phoneNumber?: string;
}
