// create-staff.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class CreateStaffDto extends CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the staff member',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the staff member' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({
    example: 'Manager',
    description: 'Job title of the staff member',
  })
  @IsOptional()
  @IsString()
  job?: string;

  @ApiPropertyOptional({
    example: 'Sales',
    description: 'Department of the staff member',
  })
  @IsOptional()
  @IsString()
  department?: string;
}
