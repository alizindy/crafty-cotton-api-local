import { Module } from '@nestjs/common';
import { VariantOptionsService } from './variant-options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantOption } from './entities/variant-option.entity';
import { VariantOptionsController } from './variant-options.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VariantOption])],
  controllers: [VariantOptionsController],
  providers: [VariantOptionsService],
  exports: [VariantOptionsService],
})
export class VariantOptionsModule { }
