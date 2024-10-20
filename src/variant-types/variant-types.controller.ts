import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { VariantTypesService } from './variant-types.service';
import { CreateVariantTypeDto } from './dto/create-variant-type.dto';
import { VariantType } from './entities/variant-types.entity';
import { UpdateVariantTypeDto } from './dto/update-variant-type.dto';

@ApiTags('VariantType')
@ApiBearerAuth('JWT')
@Controller('variant-types')
export class VariantTypesController {
    constructor(private readonly variantTypesService: VariantTypesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new variant-type' })
    @ApiCreatedResponse({
        description: 'Creates a new variant-type',
    })
    @ApiBody({ type: CreateVariantTypeDto })
    async create(@Body() createVariantTypeDto: CreateVariantTypeDto) {
        return await this.variantTypesService.create(createVariantTypeDto).catch((err) => {
            throw new HttpException(
                { message: err.message || 'Failed to create variant-type' },
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all variant-type' })
    @ApiResponse({
        status: 200,
        description: 'Retrieves all variant-type',
    })
    async findAll(): Promise<VariantType[]> {
        return this.variantTypesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a variant-type by ID' })
    @ApiResponse({
        status: 200,
        description: 'Retrieves a specific variant-type by ID',
    })
    @ApiResponse({
        status: 404,
        description: 'VariantType not found',
    })
    async findOne(@Param('id') id: string): Promise<VariantType> {
        return await this.variantTypesService.findOne(+id).catch((err) => {
            throw new HttpException(
                { message: err.message || 'VariantType not found' },
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a variant-type by ID' })
    @ApiResponse({
        status: 200,
        description: 'Updates a specific variant-type',
    })
    @ApiResponse({
        status: 400,
        description: 'Failed to update variant-type',
    })
    @ApiBody({ type: UpdateVariantTypeDto })
    async update(
        @Param('id') id: string,
        @Body() updateVariantTypeDto: UpdateVariantTypeDto,
    ): Promise<VariantType> {
        return await this.variantTypesService.update(+id, updateVariantTypeDto).catch((err) => {
            throw new HttpException(
                { message: err.message || 'Failed to update variant-type' },
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a variant-type by ID' })
    @ApiResponse({
        status: 200,
        description: 'Deletes a specific variant-type',
    })
    @ApiResponse({
        status: 404,
        description: 'VariantType not found',
    })
    async delete(@Param('id') id: number): Promise<UpdateResult> {
        return await this.variantTypesService.delete(id).catch((err) => {
            throw new HttpException(
                { message: err.message || 'Failed to delete variant-type' },
                err.message === 'VariantType not found'
                    ? HttpStatus.NOT_FOUND
                    : HttpStatus.BAD_REQUEST,
            );
        });
    }
}

