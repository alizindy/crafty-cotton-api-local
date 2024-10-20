import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductCollection1729399225017 implements MigrationInterface {
    name = 'CreateProductCollection1729399225017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_collection" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" text, CONSTRAINT "PK_49d419fc77d3aed46c835c558ac" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product_collection"`);
    }

}
