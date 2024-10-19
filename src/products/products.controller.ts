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
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ProductsService } from "./products.service";
import { UpdateResult } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

@ApiTags("Product")
@ApiBearerAuth("JWT")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new product" })
  @ApiCreatedResponse({
    description: "The product has been successfully created.",
    type: Product, // Specify the type of the response body
  })
  @ApiBody({ type: CreateProductDto })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto).catch((err) => {
      throw new HttpException(
        { message: err.message || "Failed to create product" },
        HttpStatus.BAD_REQUEST
      );
    });
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all products" })
  @ApiResponse({
    status: 200,
    description: "A list of all products has been retrieved.",
    type: [Product],
  }) // Specify response type
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a product by its ID" })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully retrieved.",
    type: Product, // Specify the type of the response body
  })
  @ApiResponse({
    status: 404,
    description: "No product found with the given ID.",
  })
  async findOne(@Param("id") id: number): Promise<Product> {
    return await this.productsService.findOne(+id).catch((err) => {
      throw new HttpException(
        { message: err.message || "Product not found" },
        HttpStatus.BAD_REQUEST
      );
    });
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a product by its ID" })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully updated.",
    type: Product, // Specify the type of the response body
  })
  @ApiBody({ type: UpdateProductDto })
  async update(
    @Param("id") id: number,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return await this.productsService
      .update(+id, updateProductDto)
      .catch((err) => {
        throw new HttpException(
          { message: err.message || "Failed to update product" },
          HttpStatus.BAD_REQUEST
        );
      });
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a product by its ID" })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully deleted.",
  })
  @ApiResponse({
    status: 404,
    description: "No product found with the given ID.",
  })
  async delete(@Param("id") id: number): Promise<UpdateResult> {
    return await this.productsService.delete(id).catch((err) => {
      throw new HttpException(
        { message: err.message || "Failed to delete product" },
        err.message === "Product not found"
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST
      );
    });
  }
}
