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
export class Creator extends BaseEntity {
  constructor(partial: Partial<Creator>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ example: 1, description: 'Unique identifier of the creator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John', description: 'First name of the creator' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the creator' })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'JohnDoe',
    description: 'Display name of the creator',
  })
  @Column()
  displayName: string;

  @ApiPropertyOptional({ description: 'Biography of the creator' })
  @Column('text', { nullable: true })
  bio: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Unique slug for the creator',
  })
  @Column()
  slug: string;

  @ApiPropertyOptional({
    example: 'facebook.com/johndoe',
    description: 'Facebook profile link',
  })
  @Column({ nullable: true })
  socialFacebook: string;

  @ApiPropertyOptional({
    example: 'instagram.com/johndoe',
    description: 'Instagram profile link',
  })
  @Column({ nullable: true })
  socialInstagram: string;

  @ApiPropertyOptional({
    example: 'linkedin.com/in/johndoe',
    description: 'LinkedIn profile link',
  })
  @Column({ nullable: true })
  socialLinkedin: string;

  @ApiPropertyOptional({
    example: 'twitter.com/johndoe',
    description: 'Twitter profile link',
  })
  @Column({ nullable: true })
  socialTwitter: string;

  @ApiProperty({ description: 'Creation date of the creator' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of the creator' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiPropertyOptional({ description: 'Deletion date of the creator' })
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiPropertyOptional({
    type: () => User,
    description: 'User profile associated with the creator',
  })
  @OneToOne(() => User, (user) => user.creator)
  @JoinColumn()
  user: User;

  @BeforeInsert()
  normalizeSlug() {
    this.slug = this.slug.toLowerCase();
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
