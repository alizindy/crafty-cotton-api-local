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
} from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';

@ApiTags('Customer')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
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
  @ApiResponse({
    status: 200,
    description: 'Retrieves all customers',
  })
  async findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Retrieves a specific customer by ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found',
  })
  async findOne(@Param('id') id: string): Promise<Customer> {
    const Customer = await this.customersService.findOne(+id);
    if (!Customer) {
      throw new HttpException(
        { message: 'Customer not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return Customer;
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Updates a specific customer',
  })
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
  @ApiResponse({
    status: 200,
    description: 'Deletes a specific Customer member',
  })
  @ApiResponse({
    status: 404,
    description: 'Customer member not found',
  })
  async delete(@Param('id') id: string): Promise<void> {
    const result = await this.customersService.delete(+id);
    if (!result.affected) {
      throw new HttpException(
        { message: 'Customer member not found' },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
