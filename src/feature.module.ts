import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { StaffsModule } from './staffs/staffs.module';
import { CreatorsModule } from './creators/creators.module';
import { CustomersModule } from './customers/customers.module';
import { StaffRolesModule } from './staff-roles/staff-roles.module';
import { CreatorsPublicModule } from './creators-public/creators-public.module';
import { VariantTypesModule } from './variant-types/variant-types.module';
import { VariantOptionsModule } from './variant-options/variant-options.module';

@Module({
  imports: [
    UsersModule,
    StaffsModule,
    CreatorsModule,
    CreatorsPublicModule,
    CustomersModule,
    StaffRolesModule,
    VariantTypesModule,
    VariantOptionsModule
  ],
})
export class FeatureModule {}
