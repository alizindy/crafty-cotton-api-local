import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateProductCollectionDto } from "./dto/create-product-collection.dto";
import { UpdateProductCollectionDto } from "./dto/update-product-collection.dto";
import { ProductCollection } from "./entities/product-collection.entity";

@Injectable()
export class ProductCollectionsService {
  constructor(
    @InjectRepository(ProductCollection)
    private readonly productCollectionRepository: Repository<ProductCollection>
  ) {}

  async create(createProductCollectionDto: CreateProductCollectionDto): Promise<ProductCollection> {
    const existingProductCollection = await this.productCollectionRepository.findOne({
      where: { slug: createProductCollectionDto.slug },
    });

    if (existingProductCollection) {
      throw new Error(
        `Product Collection with slug "${createProductCollectionDto.slug}" already exists`
      );
    }

    const productCollection = this.productCollectionRepository.create(createProductCollectionDto);
    return this.productCollectionRepository.save(productCollection);
  }

  async findAll(): Promise<ProductCollection[]> {
    return this.productCollectionRepository.find();
  }

  async findOne(id: number): Promise<ProductCollection> {
    const productCollection = await this.productCollectionRepository.findOne({
      where: { id },
    });
    if (!productCollection) {
      throw new Error(`Product Collection with ID ${id} not found`);
    }
    return productCollection;
  }

  async update(
    id: number,
    updateProductCollectionDto: UpdateProductCollectionDto
  ): Promise<ProductCollection> {
    const productCollection = await this.findOne(id);

    Object.assign(productCollection, updateProductCollectionDto);

    return this.productCollectionRepository.save(productCollection);
  }

  async delete(id: number): Promise<UpdateResult> {
    return this.productCollectionRepository.softDelete(id);
  }
}
