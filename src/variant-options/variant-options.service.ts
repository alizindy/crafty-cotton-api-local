import { Injectable } from '@nestjs/common';
import { VariantOption } from './entities/variant-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateVariantOptionDto } from './dto/create-variant-option.dto';
import { UpdateVariantOptionDto } from './dto/update-variant-option.dto';
import { VariantType } from '@/variant-types/entities/variant-types.entity';

@Injectable()
export class VariantOptionsService {
    constructor(
        @InjectRepository(VariantOption)
        private readonly variantOptionRepository: Repository<VariantOption>,
        @InjectRepository(VariantType)
        private readonly variantTypeRepository: Repository<VariantType>,
    ) { }

    async create(createVariantOptionDto: CreateVariantOptionDto): Promise<VariantOption> {

        const variantOption = this.variantOptionRepository.create(createVariantOptionDto);

        // Check if variantTypeId is provided and find the corresponding VariantType entity
        if (createVariantOptionDto.variantTypeId) {
            const variantType: VariantType = await this.variantTypeRepository.findOne({
                where: { id: createVariantOptionDto.variantTypeId },
            });

            if (!variantType) {
                throw new Error(`VariantType with ID ${createVariantOptionDto.variantTypeId} not found.`);
            }

            variantOption.variantType = variantType; // Assign the found VariantType to the variantOption
        }

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

        // Check if variantTypeId is provided and find the corresponding VariantType entity
        if (updateVariantOptionDto.variantTypeId) {
            const variantType: VariantType = await this.variantTypeRepository.findOne({
                where: { id: updateVariantOptionDto.variantTypeId },
            });

            if (!variantType) {
                throw new Error(`VariantType with ID ${updateVariantOptionDto.variantTypeId} not found.`);
            }

            variantOption.variantType = variantType; // Assign the found VariantType to the variantOption
        }

        Object.assign(variantOption, updateVariantOptionDto);

        return this.variantOptionRepository.save(variantOption);
    }

    async delete(id: number): Promise<UpdateResult> {
        return this.variantOptionRepository.softDelete(id);
    }
}
