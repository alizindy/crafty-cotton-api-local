import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCollection } from './entities/product-collection.entity';
import { ProductCollectionsController } from './product-collections.controller';
import { ProductCollectionsService } from './product-collections.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCollection])],
  controllers: [ProductCollectionsController],
  providers: [ProductCollectionsService],
  exports: [ProductCollectionsService],
})
export class ProductCollectionsModule {}
