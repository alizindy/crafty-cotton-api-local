import { Module } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { Product } from '@/products/entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductVariantsController } from './product-variants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductVariant])],
  controllers: [ProductVariantsController],
  providers: [ProductVariantsService],
  exports: [ProductVariantsService],
})
export class ProductVariantsModule {}
