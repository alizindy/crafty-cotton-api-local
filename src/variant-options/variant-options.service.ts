import { Injectable } from '@nestjs/common';
import { VariantOption } from './entities/variant-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateVariantOptionDto } from './dto/create-variant-option.dto';
import { UpdateVariantOptionDto } from './dto/update-variant-option.dto';

@Injectable()
export class VariantOptionsService {
    constructor(
        @InjectRepository(VariantOption)
        private readonly variantOptionRepository: Repository<VariantOption>,
    ) { }

    async create(createVariantOptionDto: CreateVariantOptionDto): Promise<VariantOption> {
        const variantOption = this.variantOptionRepository.create(createVariantOptionDto);
        return this.variantOptionRepository.save(variantOption);
    }

    async findAll(): Promise<VariantOption[]> {
        return this.variantOptionRepository.find();
    }

    async findOne(id: number): Promise<VariantOption> {
        const variantOption = await this.variantOptionRepository.findOne({ where: { id } });
        if (!variantOption) {
            throw new Error(`Variant Option with ID ${id} not found`);
        }
        return variantOption;
    }

    async update(
        id: number,
        updateVariantOptionDto: UpdateVariantOptionDto,
    ): Promise<VariantOption> {
        const variantOption = await this.findOne(id);

        Object.assign(variantOption, updateVariantOptionDto);

        return this.variantOptionRepository.save(variantOption);
    }

    async delete(id: number): Promise<UpdateResult> {
        return this.variantOptionRepository.softDelete(id);
    }
}
