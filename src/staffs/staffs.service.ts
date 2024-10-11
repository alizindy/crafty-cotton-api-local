import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from '@/users/entities/user.entity';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    const { email, password, firstName, lastName, job, department } =
      createStaffDto;

    const userExisted: User = await this.userRepository.findOne({
      where: {
        role: UserRole.STAFF,
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
      role: UserRole.STAFF, // Set the role as Staff (assuming you have an enum or string for this)
      isActive: true,
    });

    // Save the user to the database
    const savedUser = await this.userRepository.save(user);

    // Create the Staff entity with user_id linked to the created user
    const staff = this.staffRepository.create({
      firstName,
      lastName,
      job,
      department,
      user: savedUser, // Link the user ID
    });

    // Save the staff to the database
    return this.staffRepository.save(staff);
  }

  findAll() {
    return this.staffRepository.find();
  }

  findOne(id: number) {
    return this.staffRepository.findOneBy({ id });
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const { firstName, lastName, job, department } = updateStaffDto;

    const staff = await this.findOne(id);

    if (!staff) {
      throw new Error(`Staff member with ID ${id} not found`);
    }

    await this.staffRepository.update(id, {
      firstName,
      lastName,
      job,
      department,
    });

    return this.findOne(id);
  }

  async delete(id: number) {
    return this.staffRepository.softDelete(id);
  }
}
