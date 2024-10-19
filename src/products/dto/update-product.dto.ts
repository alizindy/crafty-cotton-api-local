import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ProductStatus } from "../entities/product.entity";

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ["slug"] as const)
) {
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: ProductStatus.DRAFT,
    description: "Status of the product (draft, published, unpublished)",
  })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
