import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { UserRole } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    private readonly dataSource: DataSource, // Inject DataSource for transactions
    private readonly usersService: UsersService, // Inject UsersService to manage user creation
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    return this.dataSource.transaction(async (manager) => {
      const { email, password, firstName, lastName, job, department } =
        createStaffDto;

      // Create the user within the transaction using UsersService
      const userEntity = await this.usersService.createUserWithTransaction(
        manager,
        {
          email,
          password,
        },
        UserRole.STAFF,
      );

      // Create the Staff entity linked to the created user
      const staff = manager.create(Staff, {
        firstName,
        lastName,
        job,
        department,
        user: userEntity, // Link the user
      });

      // Save the staff within the same transaction
      return manager.save(Staff, staff);
    });
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
