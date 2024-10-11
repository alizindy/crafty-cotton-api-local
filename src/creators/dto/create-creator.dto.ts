import { User } from '@/users/entities/user.entity';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCreatorDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsOptional()
  bio?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  slug: string;

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

  @IsOptional()
  user: User;
}
