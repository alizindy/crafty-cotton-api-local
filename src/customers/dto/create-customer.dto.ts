import { CreateUserDto } from '@/users/dto/create-user.dto';
import { User } from '@/users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

export class CreateCustomerDto extends CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the customer',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the customer',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({
    example: '0912345678',
    description: 'Phone number of the customer',
  })
  @IsString()
  @IsOptional()
  @Length(9, 10) // Ensures the string length is between 9 and 10
  @Matches(/^\d{9,10}$/, { message: 'Phone number must be 9 to 10 digits' }) // Ensures it contains only digits
  phoneNumber?: string;

  @IsOptional()
  user: User;
}
