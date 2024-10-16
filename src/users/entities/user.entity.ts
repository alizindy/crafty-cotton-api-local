import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Creator } from '@/creators/entities/creator.entity';
import { Customer } from '@/customers/entities/customer.entity';
import { Staff } from '@/staffs/entities/staff.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude, Transform } from 'class-transformer';

export enum UserRole {
  STAFF = 'staff',
  CREATOR = 'creator',
  CUSTOMER = 'customer',
}

@Entity()
export class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id: number;

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

  @ApiProperty({ description: 'Creation date of the user' })
  @CreateDateColumn()
  @Transform(({ value }) => new Date(value.getTime() + 7 * 60 * 60 * 1000))
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of the user' })
  @UpdateDateColumn()
  @Transform(({ value }) => new Date(value.getTime() + 7 * 60 * 60 * 1000))
  updatedAt: Date;

  @ApiPropertyOptional({
    type: () => Staff,
    description: 'Staff profile associated with the user',
  })
  @OneToOne(() => Staff, (staff) => staff.user)
  staff: Staff;

  @ApiPropertyOptional({
    type: () => Creator,
    description: 'Creator profile associated with the user',
  })
  @OneToOne(() => Creator, (creator) => creator.user)
  creator: Creator;

  @ApiPropertyOptional({
    type: () => Customer,
    description: 'Customer profile associated with the user',
  })
  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @BeforeInsert()
  createdAtWithTimezone() {
    const currentDate = new Date();
    const timeOffset = 7 * 60; // Offset for GMT+7 in minutes
    const localTime = new Date(currentDate.getTime() + timeOffset * 60 * 1000);
    this.createdAt = localTime;
    this.updatedAt = localTime;
  }

  @BeforeUpdate()
  updatedAtWithTimezone() {
    const currentDate = new Date();
    const timeOffset = 7 * 60; // Offset for GMT+7 in minutes
    const localTime = new Date(currentDate.getTime() + timeOffset * 60 * 1000);
    this.updatedAt = localTime;
  }
}
