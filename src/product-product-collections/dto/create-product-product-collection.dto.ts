import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductProductCollectionDto {
  @ApiProperty({
    example: 1,
    description: "Unique identifier for the product",
  })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    example: 1,
    description: "Unique identifier for the product collection",
  })
  @IsNumber()
  @IsNotEmpty()
  productCollectionId: number;
}
