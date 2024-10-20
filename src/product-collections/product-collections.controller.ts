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
import { CreateProductCollectionDto } from "./dto/create-product-collection.dto";
import { UpdateProductCollectionDto } from "./dto/update-product-collection.dto";
import { ProductCollection } from "./entities/product-collection.entity";
import { ProductCollectionsService } from "./product-collections.service";

@ApiTags("ProductCollection")
@ApiBearerAuth("JWT")
@Controller("product-collections")
export class ProductCollectionsController {
  constructor(
    private readonly productCollectionsService: ProductCollectionsService
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new product-collection" })
  @ApiCreatedResponse({
    description: "The product-collection has been successfully created.",
    type: ProductCollection, // Specify the type of the response body
  })
  @ApiBody({ type: CreateProductCollectionDto })
  async create(
    @Body() createProductCollectionDto: CreateProductCollectionDto
  ): Promise<ProductCollection> {
    return await this.productCollectionsService
      .create(createProductCollectionDto)
      .catch((err) => {
        throw new HttpException(
          { message: err.message || "Failed to create product-collection" },
          HttpStatus.BAD_REQUEST
        );
      });
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all product-collections" })
  @ApiResponse({
    status: 200,
    description: "A list of all product-collections has been retrieved.",
    type: [ProductCollection],
  }) // Specify response type
  async findAll(): Promise<ProductCollection[]> {
    return this.productCollectionsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a product-collection by its ID" })
  @ApiResponse({
    status: 200,
    description: "The product-collection has been successfully retrieved.",
    type: ProductCollection, // Specify the type of the response body
  })
  @ApiResponse({
    status: 404,
    description: "No product-collection found with the given ID.",
  })
  async findOne(@Param("id") id: number): Promise<ProductCollection> {
    return await this.productCollectionsService.findOne(+id).catch((err) => {
      throw new HttpException(
        { message: err.message || "Product Collection not found" },
        HttpStatus.BAD_REQUEST
      );
    });
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a product-collection by its ID" })
  @ApiResponse({
    status: 200,
    description: "The product-collection has been successfully updated.",
    type: ProductCollection, // Specify the type of the response body
  })
  @ApiBody({ type: UpdateProductCollectionDto })
  async update(
    @Param("id") id: number,
    @Body() updateProductCollectionDto: UpdateProductCollectionDto
  ): Promise<ProductCollection> {
    return await this.productCollectionsService
      .update(+id, updateProductCollectionDto)
      .catch((err) => {
        throw new HttpException(
          { message: err.message || "Failed to update product-collection" },
          HttpStatus.BAD_REQUEST
        );
      });
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a product-collection by its ID" })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "No product-collection found with the given ID.",
  })
  async delete(@Param("id") id: number): Promise<UpdateResult> {
    return await this.productCollectionsService.delete(id).catch((err) => {
      throw new HttpException(
        { message: err.message || "Failed to delete product-collection" },
        err.message === "Product Collection not found"
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST
      );
    });
  }
}
