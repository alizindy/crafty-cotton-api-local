import { Injectable } from "@nestjs/common";
import { ProductProductCollection } from "./entities/product-product-collection.entity";
import { Product } from "@/products/entities/product.entity";
import { ProductCollection } from "@/product-collections/entities/product-collection.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository, UpdateResult } from "typeorm";
import { CreateProductProductCollectionDto } from "./dto/create-product-product-collection.dto";
import { UpdateProductProductCollectionDto } from "./dto/update-product-product-collection.dto";

@Injectable()
export class ProductProductCollectionsService {
  constructor(
    @InjectRepository(ProductProductCollection)
    private readonly productProductCollectionRepository: Repository<ProductProductCollection>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductCollection)
    private readonly productCollectionRepository: Repository<ProductCollection>
  ) {}

  async create(
    createProductProductCollectionDto: CreateProductProductCollectionDto
  ): Promise<ProductProductCollection> {
    const productProductCollection =
      this.productProductCollectionRepository.create(
        createProductProductCollectionDto as DeepPartial<ProductProductCollection>
      );

    // Assign product to productProductCollection
    if (createProductProductCollectionDto.productId) {
      const product = await this.productRepository.findOne({
        where: { id: createProductProductCollectionDto.productId },
      });

      if (!product) {
        throw new Error(
          `Product with ID ${createProductProductCollectionDto.productId} not found.`
        );
      }

      productProductCollection.product = product; // Assign the found Product to the productProductCollection
    }

    // Assign productCollection to productProductCollection
    if (createProductProductCollectionDto.productCollectionId) {
      const productCollection = await this.productCollectionRepository.findOne({
        where: { id: createProductProductCollectionDto.productCollectionId },
      });

      if (!productCollection) {
        throw new Error(
          `Product Collection with ID ${createProductProductCollectionDto.productCollectionId} not found.`
        );
      }

      productProductCollection.productCollection = productCollection; // Assign the found Product Collection to the productProductCollection
    }

    return this.productProductCollectionRepository.save(
      productProductCollection
    );
  }

  async findAll(): Promise<ProductProductCollection[]> {
    // Include related Product and ProductCollection entities
    return this.productProductCollectionRepository.find({
      relations: ["product", "productCollection"], // Eager load relations
    });
  }

  async findOne(id: number): Promise<ProductProductCollection> {
    // Include related Product and ProductCollection entities
    const productProductCollection =
      await this.productProductCollectionRepository.findOne({
        where: { id },
        relations: ["product", "productCollection"], // Eager load relations
      });

    if (!productProductCollection) {
      throw new Error(`Product-Product-Collection with ID ${id} not found.`);
    }

    return productProductCollection;
  }

  async update(
    id: number,
    updateProductProductCollectionDto: UpdateProductProductCollectionDto
  ): Promise<ProductProductCollection> {
    const productProductCollection = await this.findOne(id);

    // Update product if provided
    if (updateProductProductCollectionDto.productId) {
      const product = await this.productRepository.findOne({
        where: { id: updateProductProductCollectionDto.productId },
      });

      if (!product) {
        throw new Error(
          `Product with ID ${updateProductProductCollectionDto.productId} not found.`
        );
      }

      productProductCollection.product = product; // Update product
    }

    // Update productCollection if provided
    if (updateProductProductCollectionDto.productCollectionId) {
      const productCollection = await this.productCollectionRepository.findOne({
        where: { id: updateProductProductCollectionDto.productCollectionId },
      });

      if (!productCollection) {
        throw new Error(
          `Product Collection with ID ${updateProductProductCollectionDto.productCollectionId} not found.`
        );
      }

      productProductCollection.productCollection = productCollection; // Update product collection
    }

    // Merge other changes
    Object.assign(productProductCollection, updateProductProductCollectionDto);

    return this.productProductCollectionRepository.save(
      productProductCollection
    );
  }

  async delete(id: number): Promise<UpdateResult> {
    return this.productProductCollectionRepository.softDelete(id);
  }
}
