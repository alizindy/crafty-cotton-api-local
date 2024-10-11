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
export class Staff extends BaseEntity {
  constructor(partial: Partial<Staff>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  job: string;

  @Column({ nullable: true })
  department: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

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
