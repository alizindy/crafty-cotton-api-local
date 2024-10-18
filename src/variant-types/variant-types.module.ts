import { Module } from '@nestjs/common';
import { VariantTypesService } from './variant-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantTypesController } from './variant-types.controller';
import { VariantType } from './entities/variant-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VariantType])],
  controllers: [VariantTypesController],
  providers: [VariantTypesService],
  exports: [VariantTypesService],
})
export class VariantTypesModule {}
