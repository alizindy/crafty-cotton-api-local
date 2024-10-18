import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, UpdateResult } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { UserRole } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffRole } from '@/staff-roles/entities/staff-role.entity';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    private readonly dataSource: DataSource, // Inject DataSource for transactions
    private readonly usersService: UsersService, // Inject UsersService to manage user creation
    @InjectRepository(StaffRole)
    private readonly staffRoleRepository: Repository<StaffRole>,
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

  async findAll(): Promise<Staff[]> {
    return this.staffRepository.find({
      relations: ['staffRole'],
    });
  }

  async findOne(id: number): Promise<Staff> {
    const staff: Staff = await this.staffRepository.findOne({
      where: { id },
      relations: ['staffRole'], // Load the related staffRole entity
    });
    if (!staff) {
      throw new Error(`Staff member with ID ${id} not found`);
    }
    return staff;
  }

  async update(id: number, updateStaffDto: UpdateStaffDto): Promise<Staff> {
    // Find the staff entity
    const staff: Staff = await this.findOne(id);

    // If staffRoleId is provided, find and assign the StaffRole entity
    if (updateStaffDto.staffRoleId) {
      const staffRole: StaffRole = await this.staffRoleRepository.findOne({
        where: {
          id: updateStaffDto.staffRoleId,
        },
      });

      staff.staffRole = staffRole; // Assign the new role
    }

    // Use Object.assign to update the rest of the fields
    Object.assign(staff, updateStaffDto);

    // Save the updated staff entity (this triggers lifecycle hooks if any)
    return this.staffRepository.save(staff);
  }

  async delete(id: number): Promise<UpdateResult> {
    return this.staffRepository.softDelete(id);
  }
}
