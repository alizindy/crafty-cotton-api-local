import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateProductVariantDto {
  @ApiProperty({
    example: 100,
    description:
      "The total quantity of this product variant that has been sold.",
  })
  @IsNumber()
  @IsOptional()
  soldQuantity?: number;

  @ApiProperty({
    example: 50,
    description:
      "The number of units of this product variant currently available in stock.",
  })
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    example: false,
    description:
      "Indicates whether this product variant is marked as legacy (older version).",
  })
  @IsBoolean()
  @IsOptional()
  isLegacy?: boolean;

  @ApiProperty({
    example: 1,
    description: "The ID of the product that this variant belongs to.",
  })
  @IsNumber()
  @IsNotEmpty()
  productId?: number;
}
