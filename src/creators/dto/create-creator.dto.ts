import { CreateUserDto } from '@/users/dto/create-user.dto';
import { User } from '@/users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCreatorDto extends CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the creator',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the creator',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'JohnDoe',
    description: 'Display name of the creator',
  })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiPropertyOptional({
    example: 'A bio about the creator',
    description: 'Biography of the creator',
  })
  @IsOptional()
  bio?: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Unique slug for the creator',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  slug: string;

  @ApiPropertyOptional({
    example: 'facebook.com/johndoe',
    description: 'Facebook profile link of the creator',
  })
  @IsString()
  @IsOptional()
  socialFacebook?: string;

  @ApiPropertyOptional({
    example: 'instagram.com/johndoe',
    description: 'Instagram profile link of the creator',
  })
  @IsString()
  @IsOptional()
  socialInstagram?: string;

  @ApiPropertyOptional({
    example: 'linkedin.com/in/johndoe',
    description: 'LinkedIn profile link of the creator',
  })
  @IsString()
  @IsOptional()
  socialLinkedin?: string;

  @ApiPropertyOptional({
    example: 'twitter.com/johndoe',
    description: 'Twitter profile link of the creator',
  })
  @IsString()
  @IsOptional()
  socialTwitter?: string;

  @IsOptional()
  user: User;
}
