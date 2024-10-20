import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { StaffsModule } from './staffs/staffs.module';
import { CreatorsModule } from './creators/creators.module';
import { CustomersModule } from './customers/customers.module';
import { StaffRolesModule } from './staff-roles/staff-roles.module';
import { CreatorsPublicModule } from './creators-public/creators-public.module';
import { VariantTypesModule } from './variant-types/variant-types.module';
import { VariantOptionsModule } from './variant-options/variant-options.module';
import { ProductsModule } from './products/products.module';
import { ProductCollectionsModule } from './product-collections/product-collections.module';

@Module({
  imports: [
    UsersModule,
    StaffsModule,
    CreatorsModule,
    CreatorsPublicModule,
    CustomersModule,
    StaffRolesModule,
    VariantTypesModule,
    VariantOptionsModule,
    ProductsModule,
    ProductCollectionsModule
  ],
})
export class FeatureModule {}
