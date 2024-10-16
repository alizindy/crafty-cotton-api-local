import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCreatorDto } from './create-creator.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCreatorDto extends PartialType(
  OmitType(CreateCreatorDto, ['email', 'password', 'slug'] as const),
) {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  bio?: string;

  @IsOptional()
  @IsString()
  socialFacebook?: string;

  @IsOptional()
  @IsString()
  socialInstagram?: string;

  @IsOptional()
  @IsString()
  socialLinkedin?: string;

  @IsOptional()
  @IsString()
  socialTwitter?: string;
}
