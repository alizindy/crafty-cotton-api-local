import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@/users/entities/user.entity';
import { Column, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '@/common/entities/app-base.entity';
import { StaffRole } from '@/staff-roles/entities/staff-role.entity';

@Entity()
export class Staff extends AppBaseEntity {
  constructor(partial: Partial<Staff>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({
    example: 'John',
    description: 'First name of the staff member',
  })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the staff member' })
  @Column()
  lastName: string;

  @ApiPropertyOptional({
    example: 'Manager',
    description: 'Job title of the staff member',
  })
  @Column({ nullable: true })
  job: string;

  @ApiPropertyOptional({
    example: 'Sales',
    description: 'Department of the staff member',
  })
  @Column({ nullable: true })
  department: string;

  @OneToOne(() => User, (user) => user.staff)
  @JoinColumn()
  user: User;

  @ManyToOne(() => StaffRole, (staffRole) => staffRole.staffs, {
    nullable: true,
  })
  staffRole: StaffRole;
}
