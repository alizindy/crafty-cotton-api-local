import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVariantOption1729305339626 implements MigrationInterface {
    name = 'CreateVariantOption1729305339626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "variant_option" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_761d0b4dc7af89e629c67d8ad14" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "variant_option"`);
    }

}
