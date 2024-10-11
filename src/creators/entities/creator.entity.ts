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
export class Creator extends BaseEntity {
  constructor(partial: Partial<Creator>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  displayName: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  socialFacebook: string;

  @Column({ nullable: true })
  socialInstagram: string;

  @Column({ nullable: true })
  socialLinkedin: string;

  @Column({ nullable: true })
  socialTwitter: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => User, (user) => user.creator)
  @JoinColumn()
  user: User;

  @BeforeInsert()
  normalizeSlug() {
    this.slug = this.slug.toLowerCase(); // Normalize slug to lower case
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
