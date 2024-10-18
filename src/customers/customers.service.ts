import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, UpdateResult } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { UserRole } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly dataSource: DataSource, // Inject DataSource for transactions
    private readonly usersService: UsersService, // Inject UsersService to manage user creation
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return this.dataSource.transaction(async (manager) => {
      const { email, password, firstName, lastName, phoneNumber } =
        createCustomerDto;

      // Create the user within the transaction using UsersService
      const userEntity = await this.usersService.createUserWithTransaction(
        manager,
        {
          email,
          password,
        },
        UserRole.CUSTOMER,
      );

      // Create the Customer entity linked to the created user
      const customer = manager.create(Customer, {
        firstName,
        lastName,
        phoneNumber: this.normalizedPhoneNumber(phoneNumber),
        user: userEntity, // Link the user
      });

      // Save the customer within the same transaction
      return manager.save(Customer, customer);
    });
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.findOne(id);

    Object.assign(customer, updateCustomerDto);

    return this.customerRepository.save(customer);
  }

  async delete(id: number): Promise<UpdateResult> {
    return this.customerRepository.softDelete(id);
  }

  normalizedPhoneNumber(tel: string): string {
    let normalizedTel = tel;

    // Normalize phone number
    if (normalizedTel && normalizedTel.length === 9) {
      normalizedTel = '0' + normalizedTel; // Prepend zero for 9-digit numbers
    }

    return normalizedTel;
  }
}
