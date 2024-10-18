import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiResponse,
  ApiBody,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreatorsService } from './creators.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { Creator } from './entities/creator.entity';
import { UpdateResult } from 'typeorm';

@ApiTags('Creator')
@ApiBearerAuth('JWT')
@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new creator' })
  @ApiCreatedResponse({
    description: 'Creates a new creator and associated user',
  })
  @ApiBody({ type: CreateCreatorDto })
  async create(@Body() createCreatorDto: CreateCreatorDto): Promise<Creator> {
    return await this.creatorsService.create(createCreatorDto).catch((err) => {
      throw new HttpException(
        { message: err.message || 'Failed to create creator' },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all creators' })
  @ApiResponse({ status: 200, description: 'Retrieves all creators' })
  async findAll(): Promise<Creator[]> {
    return this.creatorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a creator by ID' })
  @ApiResponse({
    status: 200,
    description: 'Retrieves a specific creator by ID',
  })
  @ApiResponse({ status: 404, description: 'Creator not found' })
  async findOne(@Param('id') id: number): Promise<Creator> {
    return await this.creatorsService.findOne(+id).catch((err) => {
      throw new HttpException(
        { message: err.message || 'Creator not found' },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a creator by ID' })
  @ApiResponse({ status: 200, description: 'Updates a specific creator' })
  @ApiBody({ type: UpdateCreatorDto })
  async update(
    @Param('id') id: number,
    @Body() updateCreatorDto: UpdateCreatorDto,
  ): Promise<Creator> {
    return await this.creatorsService
      .update(+id, updateCreatorDto)
      .catch((err) => {
        throw new HttpException(
          { message: err.message || 'Failed to update creator' },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a creator by ID' })
  @ApiResponse({ status: 200, description: 'Deletes a specific creator' })
  @ApiResponse({ status: 404, description: 'Creator not found' })
  async delete(@Param('id') id: number): Promise<UpdateResult> {
    return await this.creatorsService.delete(id).catch((err) => {
      throw new HttpException(
        { message: err.message || 'Failed to delete creator' },
        err.message === 'Creator not found'
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    });
  }
}
