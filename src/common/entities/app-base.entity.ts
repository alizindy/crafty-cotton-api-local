import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export abstract class AppBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Creation date of the record' })
  @Transform(({ value }) =>
    value ? new Date(value.getTime() + 7 * 60 * 60 * 1000) : null,
  )
  @Column({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of the record' })
  @Transform(({ value }) =>
    value ? new Date(value.getTime() + 7 * 60 * 60 * 1000) : null,
  )
  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty({ description: 'Deletion date of the record' })
  @Transform(({ value }) =>
    value ? new Date(value.getTime() + 7 * 60 * 60 * 1000) : null,
  )
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date | null;

  @BeforeInsert()
  setCreatedAtWithTimezone() {
    this.createdAt = this.getDateWithTimezoneOffset(7);
    this.updatedAt = this.createdAt;
  }

  @BeforeUpdate()
  setUpdatedAtWithTimezone() {
    this.updatedAt = this.getDateWithTimezoneOffset(7);
  }

  private getDateWithTimezoneOffset(offsetHours: number): Date {
    const currentDate = new Date();
    const utc =
      currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000;
    return new Date(utc + offsetHours * 60 * 60 * 1000);
  }
}
