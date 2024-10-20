import { PartialType, OmitType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CreateProductCollectionDto } from "./create-product-collection.dto";

export class UpdateProductCollectionDto extends PartialType(
  OmitType(CreateProductCollectionDto, ["slug"] as const)
) {
  @IsOptional()
  @IsString()
  name?: string;
}