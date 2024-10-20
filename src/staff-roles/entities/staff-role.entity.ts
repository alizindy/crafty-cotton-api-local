import { Column, Entity, OneToMany } from 'typeorm';
import { AppBaseEntity } from '@/common/entities/app-base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Staff } from '@/staffs/entities/staff.entity';

@Entity()
export class StaffRole extends AppBaseEntity {
  constructor(partial: Partial<StaffRole>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ example: 'Manager', description: 'Name of the staff role' })
  @Column()
  name: string;

  @ApiProperty({ example: true, description: 'Permission to access orders' })
  @Column({ type: 'boolean', default: false })
  canAccessOrder: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to access transactions',
  })
  @Column({ type: 'boolean', default: false })
  canAccessTransaction: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to access order payments',
  })
  @Column({ type: 'boolean', default: false })
  canAccessOrderPayment: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to access transaction payments',
  })
  @Column({ type: 'boolean', default: false })
  canAccessTransactionPayment: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to access payout payments',
  })
  @Column({ type: 'boolean', default: false })
  canAccessPayoutPayment: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to access payout transactions',
  })
  @Column({ type: 'boolean', default: false })
  canAccessPayoutTransaction: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to check printing status',
  })
  @Column({ type: 'boolean', default: false })
  canCheckPrinting: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to download artwork for printing',
  })
  @Column({ type: 'boolean', default: false })
  canDownloadArtWorkPrinting: boolean;

  @ApiProperty({
    example: true,
    description: 'Permission to update printing information',
  })
  @Column({ type: 'boolean', default: false })
  canUpdateInformationPrinting: boolean;

  @OneToMany(() => Staff, (staffs) => staffs.staffRole)
  staffs: Staff[];
}
