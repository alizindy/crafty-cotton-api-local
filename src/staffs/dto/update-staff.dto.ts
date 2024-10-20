// update-staff.dto.ts
import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateStaffDto } from './create-staff.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStaffDto extends PartialType(
  OmitType(CreateStaffDto, ['email', 'password'] as const),
) {
  @ApiPropertyOptional({
    example: 'UpdatedFirstName',
    description: 'Updated first name of the staff member',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({
    example: 'UpdatedLastName',
    description: 'Updated last name of the staff member',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    example: 'UpdatedJob',
    description: 'Updated job title of the staff member',
    required: false,
  })
  @IsOptional()
  @IsString()
  job?: string;

  @ApiPropertyOptional({
    example: 'UpdatedDepartment',
    description: 'Updated department of the staff member',
    required: false,
  })
  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  staffRoleId?: number;
}
