import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { AppBaseEntity } from '@/common/entities/app-base.entity';
import { User } from '@/users/entities/user.entity';

@Entity()
export class Customer extends AppBaseEntity {
  constructor(partial: Partial<Customer>) {
    super();
    Object.assign(this, partial);
  }

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

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn()
  user: User;
}
