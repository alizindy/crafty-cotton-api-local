import { Injectable } from '@nestjs/common';
import { ProductVariant } from './entities/product-variant.entity';
import { Product } from '@/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductVariantsService {
    constructor(
        @InjectRepository(ProductVariant)
        private readonly productVariantRepository: Repository<ProductVariant>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async create(createProductVariantDto: CreateProductVariantDto): Promise<ProductVariant> {

        const productVariant = this.productVariantRepository.create(createProductVariantDto);

        // Check if productId is provided and find the corresponding Product entity
        if (createProductVariantDto.productId) {
            const product: Product = await this.productRepository.findOne({
                where: { id: createProductVariantDto.productId },
            });

            if (!product) {
                throw new Error(`Product with ID ${createProductVariantDto.productId} not found.`);
            }

            productVariant.product = product; // Assign the found Product to the productVariant
        }

        return this.productVariantRepository.save(productVariant);
    }

    async findAll(): Promise<ProductVariant[]> {
        return this.productVariantRepository.find();
    }

    async findOne(id: number): Promise<ProductVariant> {
        const productVariant = await this.productVariantRepository.findOne({ where: { id } });
        if (!productVariant) {
            throw new Error(`Product Variant with ID ${id} not found`);
        }
        return productVariant;
    }

    async update(
        id: number,
        updateProductVariantDto: UpdateProductVariantDto,
    ): Promise<ProductVariant> {
        const productVariant = await this.findOne(id);

        Object.assign(productVariant, updateProductVariantDto);

        return this.productVariantRepository.save(productVariant);
    }

    async delete(id: number): Promise<UpdateResult> {
        return this.productVariantRepository.softDelete(id);
    }
}
