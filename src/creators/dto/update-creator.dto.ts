import { PartialType } from '@nestjs/mapped-types';
import { CreateCreatorDto } from './create-creator.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCreatorDto extends PartialType(CreateCreatorDto) {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  socialFacebook?: string;

  @IsString()
  @IsOptional()
  socialInstagram?: string;

  @IsString()
  @IsOptional()
  socialLinkedin?: string;

  @IsString()
  @IsOptional()
  socialTwitter?: string;
}
