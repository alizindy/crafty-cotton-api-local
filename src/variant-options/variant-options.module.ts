import { Module } from '@nestjs/common';
import { VariantOptionsService } from './variant-options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantOption } from './entities/variant-option.entity';
import { VariantOptionsController } from './variant-options.controller';
import { VariantType } from '@/variant-types/entities/variant-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VariantOption, VariantType])],
  controllers: [VariantOptionsController],
  providers: [VariantOptionsService],
  exports: [VariantOptionsService],
})
export class VariantOptionsModule { }
