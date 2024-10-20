import { AppBaseEntity } from "@/common/entities/app-base.entity";
import { Creator } from "@/creators/entities/creator.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, BeforeInsert, ManyToOne } from "typeorm";

@Entity()
export class ProductCollection extends AppBaseEntity {
  constructor(partial: Partial<ProductCollection>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({
    example: "summer-collection",
    description: "Unique slug for the product collection",
  })
  @Column()
  slug: string;

  @ApiProperty({
    example: "Summer Collection",
    description: "Name of the product collection",
  })
  @Column()
  name: string;

  @ApiProperty({
    example:
      "A curated selection of products for the summer season, featuring lightweight fabrics and bright colors.",
    description:
      "Detailed description of the product collection, including key features and the theme of the collection.",
  })
  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToOne(() => Creator, (creator) => creator.products)
  creator: Creator;

  @BeforeInsert()
  normalizeSlug() {
    this.slug = this.slug.toLowerCase().replace(/\s+/g, "-");
  }
}
