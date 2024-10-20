import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@/users/entities/user.entity';
import { Column, Entity, OneToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm';
import { AppBaseEntity } from '@/common/entities/app-base.entity';
import { Product } from '@/products/entities/product.entity';
import { ProductCollection } from '@/product-collections/entities/product-collection.entity';

@Entity()
export class Creator extends AppBaseEntity {
  constructor(partial: Partial<Creator>) {
    super();
    Object.assign(this, partial);
  }

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

  @OneToOne(() => User, (user) => user.creator)
  @JoinColumn()
  user: User;

  @OneToMany(() => Product, (products) => products.creator)
  products: Product[];

  @OneToMany(() => ProductCollection, (productCollections) => productCollections.creator)
  productCollections: ProductCollection[];

  @BeforeInsert()
  normalizeSlug() {
    this.slug = this.slug.toLowerCase().replace(/\s+/g, '-');
  }
}
