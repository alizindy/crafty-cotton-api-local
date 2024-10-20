import { Injectable, BadRequestException } from '@nestjs/common';
import { CustomersService } from '@/customers/customers.service';
import { CreatorsService } from '@/creators/creators.service';
import { StaffsService } from '@/staffs/staffs.service';
import { CreateCustomerDto } from '@/customers/dto/create-customer.dto';
import { CreateCreatorDto } from '@/creators/dto/create-creator.dto';
import { CreateStaffDto } from '@/staffs/dto/create-staff.dto';
import { UserRole } from '@/users/entities/user.entity';

@Injectable()
export class UserFactory {
  constructor(
    private readonly customersService: CustomersService,
    private readonly creatorsService: CreatorsService,
    private readonly staffsService: StaffsService,
  ) {}

  async createUserByRole(
    dto: CreateCustomerDto | CreateCreatorDto | CreateStaffDto,
    role: UserRole,
  ): Promise<any> {
    switch (role) {
      case UserRole.CUSTOMER:
        return this.customersService.create(dto as CreateCustomerDto);
      case UserRole.CREATOR:
        return this.creatorsService.create(dto as CreateCreatorDto);
      case UserRole.STAFF:
        return this.staffsService.create(dto as CreateStaffDto);
      default:
        throw new BadRequestException('Invalid role specified');
    }
  }
}
