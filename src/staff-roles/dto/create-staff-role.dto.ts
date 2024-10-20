import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStaffRoleDto {
  @ApiProperty({
    example: 'Manager',
    description: 'The name of the staff role',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: true, description: 'Permission to access orders' })
  @IsBoolean()
  @IsOptional()
  canAccessOrder?: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to access transactions',
  })
  @IsBoolean()
  @IsOptional()
  canAccessTransaction?: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to access order payments',
  })
  @IsBoolean()
  @IsOptional()
  canAccessOrderPayment?: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to access transaction payments',
  })
  @IsBoolean()
  @IsOptional()
  canAccessTransactionPayment?: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to access payout payments',
  })
  @IsBoolean()
  @IsOptional()
  canAccessPayoutPayment?: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to access payout transactions',
  })
  @IsBoolean()
  @IsOptional()
  canAccessPayoutTransaction?: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to check printing status',
  })
  @IsBoolean()
  @IsOptional()
  canCheckPrinting?: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to download artwork for printing',
  })
  @IsBoolean()
  @IsOptional()
  canDownloadArtWorkPrinting?: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to update printing information',
  })
  @IsBoolean()
  @IsOptional()
  canUpdateInformationPrinting?: boolean;
}
