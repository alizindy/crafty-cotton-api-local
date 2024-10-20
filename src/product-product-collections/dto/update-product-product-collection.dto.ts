import { PartialType } from "@nestjs/swagger";
import { CreateProductProductCollectionDto } from "./create-product-product-collection.dto";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateProductProductCollectionDto extends PartialType(
  CreateProductProductCollectionDto
) {
  @IsNumber()
  @IsOptional()
  productId?: number;

  @IsNumber()
  @IsOptional()
  productCollectionId?: number;
}
