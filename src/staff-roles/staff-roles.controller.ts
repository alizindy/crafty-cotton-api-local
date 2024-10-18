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
import { StaffRolesService } from './staff-roles.service';
import { CreateStaffRoleDto } from './dto/create-staff-role.dto';
import { UpdateStaffRoleDto } from './dto/update-staff-role.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { StaffRole } from './entities/staff-role.entity';
import { UpdateResult } from 'typeorm';

@ApiTags('Staff Roles')
@Controller('staff-roles')
export class StaffRolesController {
  constructor(private readonly staffRolesService: StaffRolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new staff role' })
  @ApiCreatedResponse({
    description: 'Creates a new staff role',
  })
  @ApiBody({ type: CreateStaffRoleDto })
  @ApiResponse({ status: 201, description: 'The staff role has been created.' })
  async create(@Body() createStaffRoleDto: CreateStaffRoleDto) {
    return await this.staffRolesService
      .create(createStaffRoleDto)
      .catch((err) => {
        throw new HttpException(
          { message: err.message || 'Failed to create staff role' },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @Get()
  @ApiOperation({ summary: 'Get all staff roles' })
  @ApiResponse({
    status: 200,
    description: 'Retrieves all staff roles',
  })
  findAll() {
    return this.staffRolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a staff role by ID' })
  @ApiResponse({
    status: 200,
    description: 'Retrieve a specific staff role by ID',
  })
  @ApiResponse({ status: 404, description: 'Staff role not found.' })
  async findOne(@Param('id') id: number): Promise<StaffRole> {
    return await this.staffRolesService.findOne(+id).catch((err) => {
      throw new HttpException(
        { message: err.message || 'Staff role not found' },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific staff role by ID' })
  @ApiResponse({ status: 200, description: 'The staff role has been updated.' })
  @ApiResponse({ status: 404, description: 'Staff role not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateStaffRoleDto: UpdateStaffRoleDto,
  ) {
    return await this.staffRolesService
      .update(+id, updateStaffRoleDto)
      .catch((err) => {
        throw new HttpException(
          { message: err.message || 'Failed to update staff role' },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific staff role by ID' })
  @ApiResponse({ status: 200, description: 'The staff role has been deleted.' })
  @ApiResponse({ status: 404, description: 'Staff role not found.' })
  async delete(@Param('id') id: number): Promise<UpdateResult> {
    return await this.staffRolesService.delete(id).catch((err) => {
      throw new HttpException(
        { message: err.message || 'Failed to delete staff role' },
        err.message === 'Staff role not found'
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    });
  }
}
