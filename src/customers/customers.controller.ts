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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';

@ApiTags('Customer')
@ApiBearerAuth('JWT')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiCreatedResponse({
    description: 'Creates a new customer and associated user',
  })
  @ApiBody({ type: CreateCustomerDto })
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    try {
      return await this.customersService.create(createCustomerDto);
    } catch (err) {
      throw new HttpException(
        { message: err.message || 'Failed to create customer' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all customers' })
  @ApiResponse({ status: 200, description: 'Retrieves all customers' })
  async findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a customer by ID' })
  @ApiResponse({
    status: 200,
    description: 'Retrieves a specific customer by ID',
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async findOne(@Param('id') id: string): Promise<Customer> {
    const customer = await this.customersService.findOne(+id);
    if (!customer) {
      throw new HttpException(
        { message: 'Customer not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return customer;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiResponse({ status: 200, description: 'Updates a specific customer' })
  @ApiBody({ type: UpdateCustomerDto })
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    try {
      return await this.customersService.update(+id, updateCustomerDto);
    } catch (err) {
      throw new HttpException(
        { message: err.message || 'Failed to update customer' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer by ID' })
  @ApiResponse({ status: 200, description: 'Deletes a specific customer' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async delete(@Param('id') id: string): Promise<void> {
    const result = await this.customersService.delete(+id);
    if (!result.affected) {
      throw new HttpException(
        { message: 'Customer not found' },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
