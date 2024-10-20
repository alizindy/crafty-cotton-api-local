import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { StaffRole } from './entities/staff-role.entity';
import { CreateStaffRoleDto } from './dto/create-staff-role.dto';
import { UpdateStaffRoleDto } from './dto/update-staff-role.dto';

@Injectable()
export class StaffRolesService {
  constructor(
    @InjectRepository(StaffRole)
    private readonly staffRoleRepository: Repository<StaffRole>,
  ) {}

  async create(createStaffRoleDto: CreateStaffRoleDto): Promise<StaffRole> {
    const staffRole = this.staffRoleRepository.create(createStaffRoleDto);
    return this.staffRoleRepository.save(staffRole);
  }

  async findAll(): Promise<StaffRole[]> {
    return this.staffRoleRepository.find();
  }

  async findOne(id: number): Promise<StaffRole> {
    const staffRole = await this.staffRoleRepository.findOne({ where: { id } });
    if (!staffRole) {
      throw new Error(`Staff role with ID ${id} not found`);
    }
    return staffRole;
  }

  async update(
    id: number,
    updateStaffRoleDto: UpdateStaffRoleDto,
  ): Promise<StaffRole> {
    const staffRole = await this.findOne(id);

    Object.assign(staffRole, updateStaffRoleDto);

    return this.staffRoleRepository.save(staffRole);
  }

  async delete(id: number): Promise<UpdateResult> {
    return this.staffRoleRepository.softDelete(id);
  }
}
