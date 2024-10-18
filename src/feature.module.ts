import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { StaffsModule } from './staffs/staffs.module';
import { CreatorsModule } from './creators/creators.module';
import { CustomersModule } from './customers/customers.module';
import { StaffRolesModule } from './staff-roles/staff-roles.module';

@Module({
  imports: [
    UsersModule,
    StaffsModule,
    CreatorsModule,
    CustomersModule,
    StaffRolesModule,
  ],
})
export class FeatureModule {}
