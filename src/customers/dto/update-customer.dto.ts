import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsOptional, IsString, Length, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerDto extends PartialType(
  OmitType(CreateCustomerDto, ['email', 'password'] as const),
) {
  @ApiPropertyOptional({
    example: 'UpdatedFirstName',
    description: 'Updated first name of the customer',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({
    example: 'UpdatedLastName',
    description: 'Updated last name of the customer',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    example: '0998765432',
    description: 'Updated phone number of the customer',
  })
  @IsString()
  @IsOptional()
  @Length(9, 10) // Ensures the string length is between 9 and 10
  @Matches(/^\d{9,10}$/, { message: 'Phone number must be 9 to 10 digits' }) // Ensures it contains only digits
  phoneNumber?: string;
}
