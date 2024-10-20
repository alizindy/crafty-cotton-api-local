import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductVariant1729431088314 implements MigrationInterface {
    name = 'CreateProductVariant1729431088314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_variant" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "sold_quantity" integer NOT NULL DEFAULT '0', "stock" integer NOT NULL DEFAULT '0', "is_legacy" boolean NOT NULL DEFAULT false, "product_id" integer, CONSTRAINT "PK_1ab69c9935c61f7c70791ae0a9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD CONSTRAINT "FK_ca67dd080aac5ecf99609960cd2" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant" DROP CONSTRAINT "FK_ca67dd080aac5ecf99609960cd2"`);
        await queryRunner.query(`DROP TABLE "product_variant"`);
    }

}
