import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { Staff } from './entities/staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@/users/users.module';
import { StaffRole } from '@/staff-roles/entities/staff-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, StaffRole]), UsersModule],
  controllers: [StaffsController],
  providers: [StaffsService],
  exports: [StaffsService],
})
export class StaffsModule {}
