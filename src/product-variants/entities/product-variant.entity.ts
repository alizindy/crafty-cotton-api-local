import { AppBaseEntity } from "@/common/entities/app-base.entity";
import { Product } from "@/products/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class ProductVariant extends AppBaseEntity {
  constructor(partial: Partial<ProductVariant>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({
    example: 100,
    description:
      "The total quantity of this product variant that has been sold.",
  })
  @Column({ default: 0 })
  soldQuantity: number;

  @ApiProperty({
    example: 50,
    description:
      "The number of units of this product variant currently available in stock.",
  })
  @Column({ default: 0 })
  stock: number;

  @ApiProperty({
    example: false,
    description:
      "Indicates whether this product variant is marked as legacy (older version).",
  })
  @Column({ default: false })
  isLegacy: boolean;

  @ManyToOne(() => Product, (product) => product.productVariants, {
    nullable: true,
  })
  product: Product;
}
