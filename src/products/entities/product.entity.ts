import { AppBaseEntity } from "@/common/entities/app-base.entity";
import { ProductVariant } from "@/product-variants/entities/product-variant.entity";
import { ProductProductCollection } from "@/product-product-collections/entities/product-product-collection.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";

export enum ProductStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  UNPUBLISHED = "unpublished",
}

@Entity()
export class Product extends AppBaseEntity {
  constructor(partial: Partial<Product>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({
    example: "cool-t-shirt",
    description: "Unique slug for the product",
  })
  @Column()
  slug: string;

  @ApiProperty({
    example: "Cool T-Shirt",
    description: "Name of the product",
  })
  @Column()
  name: string;

  @ApiProperty({
    example: ProductStatus.DRAFT,
    description: "Status of the product (draft, published, unpublished)",
  })
  @Column({
    type: "enum",
    enum: ProductStatus,
    default: ProductStatus.DRAFT,
  })
  status: ProductStatus;

  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product)
  productVariants: ProductVariant[];
  
  @OneToMany(() => ProductProductCollection, (productProductCollections) => productProductCollections.product)
  productProductCollections: ProductProductCollection[];

  @BeforeInsert()
  normalizeSlug() {
    this.slug = this.slug.toLowerCase().replace(/\s+/g, "-");
  }
}
