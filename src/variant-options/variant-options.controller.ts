import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VariantOptionsService } from './variant-options.service';
import { CreateVariantOptionDto } from './dto/create-variant-option.dto';
import { VariantOption } from './entities/variant-option.entity';
import { UpdateVariantOptionDto } from './dto/update-variant-option.dto';
import { UpdateResult } from 'typeorm';

@ApiTags('VariantOption')
@ApiBearerAuth('JWT')
@Controller('variant-options')
export class VariantOptionsController {
    constructor(private readonly variantOptionsService: VariantOptionsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new variant-option' })
    @ApiCreatedResponse({
        description: 'Creates a new variant-option',
    })
    @ApiBody({ type: CreateVariantOptionDto })
    async create(@Body() createVariantOptionDto: CreateVariantOptionDto) {
        return await this.variantOptionsService.create(createVariantOptionDto).catch((err) => {
            throw new HttpException(
                { message: err.message || 'Failed to create variant-option' },
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all variant-option' })
    @ApiResponse({
        status: 200,
        description: 'Retrieves all variant-option',
    })
    async findAll(): Promise<VariantOption[]> {
        return this.variantOptionsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a variant-option by ID' })
    @ApiResponse({
        status: 200,
        description: 'Retrieves a specific variant-option by ID',
    })
    @ApiResponse({
        status: 404,
        description: 'VariantOption not found',
    })
    async findOne(@Param('id') id: string): Promise<VariantOption> {
        return await this.variantOptionsService.findOne(+id).catch((err) => {
            throw new HttpException(
                { message: err.message || 'VariantOption not found' },
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a variant-option by ID' })
    @ApiResponse({
        status: 200,
        description: 'Updates a specific variant-option',
    })
    @ApiResponse({
        status: 400,
        description: 'Failed to update variant-option',
    })
    @ApiBody({ type: UpdateVariantOptionDto })
    async update(
        @Param('id') id: string,
        @Body() updateVariantOptionDto: UpdateVariantOptionDto,
    ): Promise<VariantOption> {
        return await this.variantOptionsService.update(+id, updateVariantOptionDto).catch((err) => {
            throw new HttpException(
                { message: err.message || 'Failed to update variant-option' },
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a variant-option by ID' })
    @ApiResponse({
        status: 200,
        description: 'Deletes a specific variant-option',
    })
    @ApiResponse({
        status: 404,
        description: 'VariantOption not found',
    })
    async delete(@Param('id') id: number): Promise<UpdateResult> {
        return await this.variantOptionsService.delete(id).catch((err) => {
            throw new HttpException(
                { message: err.message || 'Failed to delete variant-option' },
                err.message === 'VariantOption not found'
                    ? HttpStatus.NOT_FOUND
                    : HttpStatus.BAD_REQUEST,
            );
        });
    }
}
