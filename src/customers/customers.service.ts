import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from '@/users/entities/user.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { email, password, firstName, lastName, phoneNumber } =
      createCustomerDto;

    const userExisted: User = await this.userRepository.findOne({
      where: {
        role: UserRole.CUSTOMER,
        email,
      },
    });

    if (userExisted) {
      throw new Error('Email has been used');
    }
    // Hash the password (you might have a utility function for this)

    // Create the User entity
    const user = this.userRepository.create({
      email,
      password,
      role: UserRole.CUSTOMER, // Set the role as Customer (assuming you have an enum or string for this)
      isActive: true,
    });

    // Save the user to the database
    const savedUser = await this.userRepository.save(user);

    // Create the Customer entity with user_id linked to the created user
    const customer = this.customerRepository.create({
      firstName,
      lastName,
      phoneNumber: this.normalizedPhoneNumber(phoneNumber),
      user: savedUser, // Link the user ID
    });

    // Save the customer to the database
    return this.customerRepository.save(customer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: number) {
    return this.customerRepository.findOneBy({ id });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const { firstName, lastName, phoneNumber } = updateCustomerDto;

    const customer = await this.findOne(id);

    if (!customer) {
      throw new Error(`Customer member with ID ${id} not found`);
    }

    await this.customerRepository.update(id, {
      firstName,
      lastName,
      phoneNumber: this.normalizedPhoneNumber(phoneNumber),
    });

    return this.findOne(id);
  }

  async delete(id: number) {
    return this.customerRepository.softDelete(id);
  }

  normalizedPhoneNumber(tel: string) {
    let normalizedTel = tel;

    // Normalize phone number
    if (normalizedTel && normalizedTel.length === 9) {
      normalizedTel = '0' + normalizedTel; // Prepend zero for 9-digit numbers
    }

    return normalizedTel;
  }
}
