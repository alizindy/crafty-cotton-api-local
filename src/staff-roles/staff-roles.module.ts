import { Module } from '@nestjs/common';
import { StaffRolesService } from './staff-roles.service';
import { StaffRolesController } from './staff-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRole } from './entities/staff-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffRole])],
  controllers: [StaffRolesController],
  providers: [StaffRolesService],
  exports: [StaffRolesService],
})
export class StaffRolesModule {}
