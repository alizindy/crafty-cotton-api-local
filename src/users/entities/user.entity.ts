import { ApiProperty } from '@nestjs/swagger';
import { Creator } from '@/creators/entities/creator.entity';
import { Customer } from '@/customers/entities/customer.entity';
import { Staff } from '@/staffs/entities/staff.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AppBaseEntity } from '@/common/entities/app-base.entity';

export enum UserRole {
  STAFF = 'staff',
  CREATOR = 'creator',
  CUSTOMER = 'customer',
}

@Entity()
export class User extends AppBaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  @Column()
  email: string;

  @Exclude()
  @ApiProperty({ description: 'Hashed password of the user' })
  @Column()
  password: string;

  @ApiProperty({ example: UserRole.STAFF, description: 'Role of the user' })
  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @ApiProperty({
    example: true,
    description: 'Indicates if the user is active',
  })
  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Staff, (staff) => staff.user)
  staff: Staff;

  @OneToOne(() => Creator, (creator) => creator.user)
  creator: Creator;

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;
}
