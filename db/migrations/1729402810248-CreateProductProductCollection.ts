import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductProductCollection1729402810248 implements MigrationInterface {
    name = 'CreateProductProductCollection1729402810248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_product_collection" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "product_id" integer, "product_collection_id" integer, CONSTRAINT "PK_38fac60dd62f32bb833a9179a97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_product_collection" ADD CONSTRAINT "FK_d67287866736cf4b386da4a5b8c" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_product_collection" ADD CONSTRAINT "FK_9cad0de6696164452d3248fe272" FOREIGN KEY ("product_collection_id") REFERENCES "product_collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_product_collection" DROP CONSTRAINT "FK_9cad0de6696164452d3248fe272"`);
        await queryRunner.query(`ALTER TABLE "product_product_collection" DROP CONSTRAINT "FK_d67287866736cf4b386da4a5b8c"`);
        await queryRunner.query(`DROP TABLE "product_product_collection"`);
    }

}
