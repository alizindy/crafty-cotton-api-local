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
    try {
      return await this.creatorsService.create(createCreatorDto);
    } catch (err) {
      throw new HttpException(
        { message: err.message || 'Failed to create creator' },
        HttpStatus.BAD_REQUEST,
      );
    }
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
  async findOne(@Param('id') id: string): Promise<Creator> {
    const creator = await this.creatorsService.findOne(+id);
    if (!creator) {
      throw new HttpException(
        { message: 'Creator not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return creator;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a creator by ID' })
  @ApiResponse({ status: 200, description: 'Updates a specific creator' })
  @ApiBody({ type: UpdateCreatorDto })
  async update(
    @Param('id') id: string,
    @Body() updateCreatorDto: UpdateCreatorDto,
  ): Promise<Creator> {
    try {
      return await this.creatorsService.update(+id, updateCreatorDto);
    } catch (err) {
      throw new HttpException(
        { message: err.message || 'Failed to update creator' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a creator by ID' })
  @ApiResponse({ status: 200, description: 'Deletes a specific creator' })
  @ApiResponse({ status: 404, description: 'Creator not found' })
  async delete(@Param('id') id: string): Promise<void> {
    const result = await this.creatorsService.delete(+id);
    if (!result.affected) {
      throw new HttpException(
        { message: 'Creator not found' },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
