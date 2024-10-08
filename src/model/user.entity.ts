import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeUpdate,
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

  @Column({ nullable: false })
  email: string;

  // @Transform((value) => {
  //   if (value && typeof value === 'string') {
  //     return bcrypt.hash(value, 8);
  //   }

  //   return value;
  // })
  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF,
  })
  role: UserRole;

  @Column({
    default: true,
    nullable: false,
  })
  status: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

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
    this.createdAt = new Date(currentDate.getTime());
    this.updatedAt = new Date(currentDate.getTime());
  }

  @BeforeUpdate()
  updatedAtWithTimezone() {
    const currentDate = new Date();
    this.updatedAt = new Date(currentDate.getTime());
  }
}
