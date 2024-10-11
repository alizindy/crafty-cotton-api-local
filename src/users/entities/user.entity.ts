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
  BeforeUpdate,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

// import * as bcrypt from 'bcryptjs';

// import { Merchant } from './merchant.entity';
// import { Customer } from './customer.entity';
// import { Admin } from './admin.entity';
// import { ImageUpload } from './image-upload.entity';
// import { OnBoardingStep, UserGender, UserStatus } from './enum/user.enum';
// import { OmniauthIdentity } from './omniauth-identity.entity';
// import { Transform } from 'class-transformer';

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

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // @Transform((value) => {
  //   if (value && typeof value === 'string') {
  //     return bcrypt.hash(value, 8);
  //   }

  //   return value;
  // })
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Staff, (staff) => staff.user)
  staff: Staff;

  @OneToOne(() => Creator, (creator) => creator.user)
  creator: Creator;

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;

  // @BeforeInsert()
  // async hashPassword() {
  //   if (this.password) {
  //     this.password = await bcrypt.hash(this.password, 8);
  //   }
  // }

  // async validatePassword(password: string): Promise<boolean> {
  //   return bcrypt.compare(password, this.password);
  // }

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
