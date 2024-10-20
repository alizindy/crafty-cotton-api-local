import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCollection } from './entities/product-collection.entity';
import { ProductCollectionsController } from './product-collections.controller';
import { ProductCollectionsService } from './product-collections.service';
import { Creator } from '@/creators/entities/creator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCollection, Creator])],
  controllers: [ProductCollectionsController],
  providers: [ProductCollectionsService],
  exports: [ProductCollectionsService],
})
export class ProductCollectionsModule {}
