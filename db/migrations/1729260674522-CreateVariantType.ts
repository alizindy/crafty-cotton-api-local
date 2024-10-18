import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVariantType1729260674522 implements MigrationInterface {
    name = 'CreateVariantType1729260674522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "variant_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_f0f15d3b0ad5ddf972b43168139" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "variant_type"`);
    }

}
