import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    example: "Cool T-Shirt",
    description: "Name of the product",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "cool-t-shirt",
    description: "Unique slug for the product",
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  slug: string;

  @IsNumber()
  @IsNotEmpty()
  creatorId: number;
}
