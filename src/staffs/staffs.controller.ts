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
  ApiCreatedResponse,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './entities/staff.entity';

@ApiTags('Staff')
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Creates a new staff member and associated user',
  })
  @ApiBody({ type: CreateStaffDto })
  async create(@Body() createStaffDto: CreateStaffDto): Promise<Staff> {
    try {
      return await this.staffsService.create(createStaffDto);
    } catch (err) {
      throw new HttpException(
        { message: err.message || 'Failed to create staff member' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retrieves all staff members',
  })
  async findAll(): Promise<Staff[]> {
    return this.staffsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Retrieves a specific staff member by ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Staff member not found',
  })
  async findOne(@Param('id') id: string): Promise<Staff> {
    const staff = await this.staffsService.findOne(+id);
    if (!staff) {
      throw new HttpException(
        { message: 'Staff member not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return staff;
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Updates a specific staff member',
  })
  @ApiBody({ type: UpdateStaffDto })
  async update(
    @Param('id') id: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ): Promise<Staff> {
    try {
      return await this.staffsService.update(+id, updateStaffDto);
    } catch (err) {
      throw new HttpException(
        { message: err.message || 'Failed to update staff member' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deletes a specific staff member',
  })
  @ApiResponse({
    status: 404,
    description: 'Staff member not found',
  })
  async delete(@Param('id') id: string): Promise<void> {
    const result = await this.staffsService.delete(+id);
    if (!result.affected) {
      throw new HttpException(
        { message: 'Staff member not found' },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
