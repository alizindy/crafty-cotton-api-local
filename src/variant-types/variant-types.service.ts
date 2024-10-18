import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { VariantType } from './entities/variant-types.entity';
import { CreateVariantTypeDto } from './dto/create-variant-type.dto';
import { UpdateVariantTypeDto } from './dto/update-variant-type.dto';

@Injectable()
export class VariantTypesService {
    constructor(
      @InjectRepository(VariantType)
      private readonly variantTypeRepository: Repository<VariantType>,
    ) {}
  
    async create(createVariantTypeDto: CreateVariantTypeDto): Promise<VariantType> {
      const variantType = this.variantTypeRepository.create(createVariantTypeDto);
      return this.variantTypeRepository.save(variantType);
    }
  
    async findAll(): Promise<VariantType[]> {
      return this.variantTypeRepository.find();
    }
  
    async findOne(id: number): Promise<VariantType> {
      const variantType = await this.variantTypeRepository.findOne({ where: { id } });
      if (!variantType) {
        throw new Error(`Variant Type with ID ${id} not found`);
      }
      return variantType;
    }
  
    async update(
      id: number,
      updateVariantTypeDto: UpdateVariantTypeDto,
    ): Promise<VariantType> {
      const variantType = await this.findOne(id);
  
      Object.assign(variantType, updateVariantTypeDto);
  
      return this.variantTypeRepository.save(variantType);
    }
  
    async delete(id: number): Promise<UpdateResult> {
      return this.variantTypeRepository.softDelete(id);
    }
  }
  
