import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateProductCollectionDto {
  @ApiProperty({
    example: "summer-collection",
    description: "Unique slug for the product collection",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Summer Collection",
    description: "Name of the product collection",
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  slug: string;

  @ApiProperty({
    example: "A curated selection of products for the summer season, featuring lightweight fabrics and bright colors.",
    description: "Detailed description of the product collection, including key features and the theme of the collection.",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
