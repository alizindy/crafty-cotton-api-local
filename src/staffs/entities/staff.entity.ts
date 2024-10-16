import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@/users/entities/user.entity';
import { Transform } from 'class-transformer';
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
export class Staff extends BaseEntity {
  constructor(partial: Partial<Staff>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the staff member',
  })
  @PrimaryGeneratedColumn()
  id: number;

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

  @ApiProperty({ description: 'Creation date of the staff member' })
  @CreateDateColumn()
  @Transform(({ value }) => new Date(value.getTime() + 7 * 60 * 60 * 1000))
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of the staff member' })
  @UpdateDateColumn()
  @Transform(({ value }) => new Date(value.getTime() + 7 * 60 * 60 * 1000))
  updatedAt: Date;

  @ApiPropertyOptional({ description: 'Deletion date of the staff member' })
  @DeleteDateColumn()
  @Transform(({ value }) => new Date(value.getTime() + 7 * 60 * 60 * 1000))
  deletedAt: Date;

  @ApiPropertyOptional({
    type: () => User,
    description: 'User profile associated with the staff member',
  })
  @OneToOne(() => User, (user) => user.staff)
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
