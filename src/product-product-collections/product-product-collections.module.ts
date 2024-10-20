import { Module } from '@nestjs/common';
import { ProductProductCollectionsService } from './product-product-collections.service';
import { Product } from '@/products/entities/product.entity';
import { ProductCollection } from '@/product-collections/entities/product-collection.entity';
import { ProductProductCollection } from './entities/product-product-collection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductProductCollectionsController } from './product-product-collections.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCollection, ProductProductCollection])],
  controllers: [ProductProductCollectionsController],
  providers: [ProductProductCollectionsService],
  exports: [ProductProductCollectionsService],
})
export class ProductProductCollectionsModule {}
