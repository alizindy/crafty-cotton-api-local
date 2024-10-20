import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { ProductProductCollectionsService } from "./product-product-collections.service";
import { CreateProductProductCollectionDto } from "./dto/create-product-product-collection.dto";
import { UpdateProductProductCollectionDto } from "./dto/update-product-product-collection.dto";
import { ProductProductCollection } from "./entities/product-product-collection.entity";
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiCreatedResponse,
    ApiResponse,
    ApiBody,
} from "@nestjs/swagger";
import { UpdateResult } from "typeorm";

@ApiTags("ProductProductCollection")
@ApiBearerAuth("JWT")
@Controller("product-product-collections")
export class ProductProductCollectionsController {
  constructor(
    private readonly productProductCollectionsService: ProductProductCollectionsService
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new product-product-collection" })
  @ApiCreatedResponse({
    description:
      "The product-product-collection has been successfully created.",
    type: ProductProductCollection,
  })
  @ApiBody({ type: CreateProductProductCollectionDto })
  async create(
    @Body() createProductProductCollectionDto: CreateProductProductCollectionDto
  ): Promise<ProductProductCollection> {
    return await this.productProductCollectionsService
      .create(createProductProductCollectionDto)
      .catch((err) => {
        throw new HttpException(
          {
            message:
              err.message || "Failed to create product-product-collection",
          },
          HttpStatus.BAD_REQUEST
        );
      });
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all product-product-collections" })
  @ApiResponse({
    status: 200,
    description:
      "A list of all product-product-collections has been retrieved.",
    type: [ProductProductCollection],
  })
  async findAll(): Promise<ProductProductCollection[]> {
    return this.productProductCollectionsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a product-product-collection by its ID" })
  @ApiResponse({
    status: 200,
    description:
      "The product-product-collection has been successfully retrieved.",
    type: ProductProductCollection,
  })
  @ApiResponse({
    status: 404,
    description: "No product-product-collection found with the given ID.",
  })
  async findOne(@Param("id") id: number): Promise<ProductProductCollection> {
    return await this.productProductCollectionsService
      .findOne(+id)
      .catch((err) => {
        throw new HttpException(
          { message: err.message || "Product-Product Collection not found" },
          HttpStatus.BAD_REQUEST
        );
      });
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a product-product-collection by its ID" })
  @ApiResponse({
    status: 200,
    description:
      "The product-product-collection has been successfully updated.",
    type: ProductProductCollection,
  })
  @ApiBody({ type: UpdateProductProductCollectionDto })
  async update(
    @Param("id") id: number,
    @Body() updateProductProductCollectionDto: UpdateProductProductCollectionDto
  ): Promise<ProductProductCollection> {
    return await this.productProductCollectionsService
      .update(+id, updateProductProductCollectionDto)
      .catch((err) => {
        throw new HttpException(
          {
            message:
              err.message || "Failed to update product-product-collection",
          },
          HttpStatus.BAD_REQUEST
        );
      });
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a product-product-collection by its ID" })
  @ApiResponse({
    status: 200,
    description:
      "The product-product-collection has been successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "No product-product-collection found with the given ID.",
  })
  async delete(@Param("id") id: number): Promise<UpdateResult> {
    return await this.productProductCollectionsService
      .delete(id)
      .catch((err) => {
        throw new HttpException(
          {
            message:
              err.message || "Failed to delete product-product-collection",
          },
          err.message === "Product-Product Collection not found"
            ? HttpStatus.NOT_FOUND
            : HttpStatus.BAD_REQUEST
        );
      });
  }
}
