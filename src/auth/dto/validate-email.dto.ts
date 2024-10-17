// validate-email.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ValidateEmailDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address to validate for login',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
