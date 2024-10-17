import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'Email of user',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: '!Abcd123',
    description: 'Password of user',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
