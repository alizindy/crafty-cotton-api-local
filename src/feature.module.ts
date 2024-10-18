import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { StaffsModule } from './staffs/staffs.module';
import { CreatorsModule } from './creators/creators.module';
import { CustomersModule } from './customers/customers.module';
import { StaffRolesModule } from './staff-roles/staff-roles.module';
import { CreatorsPublicModule } from './creators-public/creators-public.module';

@Module({
  imports: [
    UsersModule,
    StaffsModule,
    CreatorsModule,
    CreatorsPublicModule,
    CustomersModule,
    StaffRolesModule,
  ],
})
export class FeatureModule {}
