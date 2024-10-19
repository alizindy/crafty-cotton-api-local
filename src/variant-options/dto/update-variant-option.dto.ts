import { PartialType } from "@nestjs/swagger";
import { CreateVariantOptionDto } from "./create-variant-option.dto";
import { IsOptional } from "class-validator";

export class UpdateVariantOptionDto extends PartialType(CreateVariantOptionDto) { }