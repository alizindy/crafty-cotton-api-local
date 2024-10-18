// staffs.controller.ts
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
  ApiOperation,
  ApiCreatedResponse,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './entities/staff.entity';
import { UpdateResult } from 'typeorm';

@ApiTags('Staff')
@ApiBearerAuth('JWT')
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new staff member' })
  @ApiCreatedResponse({
    description: 'Creates a new staff member and associated user',
  })
  @ApiBody({ type: CreateStaffDto })
  async create(@Body() createStaffDto: CreateStaffDto) {
    return await this.staffsService.create(createStaffDto).catch((err) => {
      throw new HttpException(
        { message: err.message || 'Failed to create staff member' },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all staff members' })
  @ApiResponse({
    status: 200,
    description: 'Retrieves all staff members',
  })
  async findAll(): Promise<Staff[]> {
    return this.staffsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a staff member by ID' })
  @ApiResponse({
    status: 200,
    description: 'Retrieves a specific staff member by ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Staff member not found',
  })
  async findOne(@Param('id') id: string): Promise<Staff> {
    return await this.staffsService.findOne(+id).catch((err) => {
      throw new HttpException(
        { message: err.message || 'Staff member not found' },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a staff member by ID' })
  @ApiResponse({
    status: 200,
    description: 'Updates a specific staff member',
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to update staff member',
  })
  @ApiBody({ type: UpdateStaffDto })
  async update(
    @Param('id') id: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ): Promise<Staff> {
    return await this.staffsService.update(+id, updateStaffDto).catch((err) => {
      throw new HttpException(
        { message: err.message || 'Failed to update staff member' },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a staff member by ID' })
  @ApiResponse({
    status: 200,
    description: 'Deletes a specific staff member',
  })
  @ApiResponse({
    status: 404,
    description: 'Staff member not found',
  })
  async delete(@Param('id') id: number): Promise<UpdateResult> {
    return await this.staffsService.delete(id).catch((err) => {
      throw new HttpException(
        { message: err.message || 'Failed to delete staff' },
        err.message === 'Staff not found'
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    });
  }
}
