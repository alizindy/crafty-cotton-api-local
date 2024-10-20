import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
  ApiBody,
  ApiResponse,
} from "@nestjs/swagger";
import { UpdateResult } from "typeorm";
import { CreateProductVariantDto } from "./dto/create-product-variant.dto";
import { UpdateProductVariantDto } from "./dto/update-product-variant.dto";
import { ProductVariant } from "./entities/product-variant.entity";
import { ProductVariantsService } from "./product-variants.service";

@ApiTags("ProductVariant")
@ApiBearerAuth("JWT")
@Controller("product-variants")
export class ProductVariantsController {
  constructor(
    private readonly productVariantsService: ProductVariantsService
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new product-variant" })
  @ApiCreatedResponse({
    description: "Creates a new product-variant",
  })
  @ApiBody({ type: CreateProductVariantDto })
  async create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return await this.productVariantsService
      .create(createProductVariantDto)
      .catch((err) => {
        throw new HttpException(
          { message: err.message || "Failed to create product-variant" },
          HttpStatus.BAD_REQUEST
        );
      });
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all product-variant" })
  @ApiResponse({
    status: 200,
    description: "Retrieves all product-variant",
  })
  async findAll(): Promise<ProductVariant[]> {
    return this.productVariantsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a product-variant by ID" })
  @ApiResponse({
    status: 200,
    description: "Retrieves a specific product-variant by ID",
  })
  @ApiResponse({
    status: 404,
    description: "ProductVariant not found",
  })
  async findOne(@Param("id") id: string): Promise<ProductVariant> {
    return await this.productVariantsService.findOne(+id).catch((err) => {
      throw new HttpException(
        { message: err.message || "Product Variant not found" },
        HttpStatus.BAD_REQUEST
      );
    });
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a product-variant by ID" })
  @ApiResponse({
    status: 200,
    description: "Updates a specific product-variant",
  })
  @ApiResponse({
    status: 400,
    description: "Failed to update product-variant",
  })
  @ApiBody({ type: UpdateProductVariantDto })
  async update(
    @Param("id") id: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto
  ): Promise<ProductVariant> {
    return await this.productVariantsService
      .update(+id, updateProductVariantDto)
      .catch((err) => {
        throw new HttpException(
          { message: err.message || "Failed to update product-variant" },
          HttpStatus.BAD_REQUEST
        );
      });
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a product-variant by ID" })
  @ApiResponse({
    status: 200,
    description: "Deletes a specific product-variant",
  })
  @ApiResponse({
    status: 404,
    description: "ProductVariant not found",
  })
  async delete(@Param("id") id: number): Promise<UpdateResult> {
    return await this.productVariantsService.delete(id).catch((err) => {
      throw new HttpException(
        { message: err.message || "Failed to delete product-variant" },
        err.message === "ProductVariant not found"
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST
      );
    });
  }
}
