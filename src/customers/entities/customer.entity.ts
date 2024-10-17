import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class Customer extends BaseEntity {
  constructor(partial: Partial<Customer>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ example: 1, description: 'Unique identifier of the customer' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Jane', description: 'First name of the customer' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the customer' })
  @Column()
  lastName: string;

  @ApiPropertyOptional({
    example: '0912345678',
    description: 'Phone number of the customer',
  })
  @Column({ nullable: true })
  phoneNumber: string;

  @ApiProperty({ description: 'Creation date of the customer' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of the customer' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiPropertyOptional({ description: 'Deletion date of the customer' })
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiPropertyOptional({
    type: () => User,
    description: 'User profile associated with the customer',
  })
  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn()
  user: User;

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
