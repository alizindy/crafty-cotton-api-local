import { AppBaseEntity } from "@/common/entities/app-base.entity";
import { ProductCollection } from "@/product-collections/entities/product-collection.entity";
import { Product } from "@/products/entities/product.entity";
import { Entity, ManyToOne } from "typeorm";

@Entity()
export class ProductProductCollection extends AppBaseEntity {
  @ManyToOne(() => Product, (product) => product.productProductCollections)
  product: Product;

  @ManyToOne(() => ProductCollection, (productCollection) => productCollection.productProductCollections)
  productCollection: ProductCollection;
}
