import { Module } from '@nestjs/common';

import { StaffsModule } from './staffs/staffs.module';
import { CreatorsModule } from './creators/creators.module';
import { CustomersModule } from './customers/customers.module';
import { StaffRolesModule } from './staff-roles/staff-roles.module';
import { VariantTypesModule } from './variant-types/variant-types.module';
import { VariantOptionsModule } from './variant-options/variant-options.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    UsersModule,
    StaffsModule,
    CreatorsModule,
    CustomersModule,
    StaffRolesModule,
    VariantTypesModule,
    VariantOptionsModule,
  ],
})
export class FeatureModule {}
