import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProduct1729352480368 implements MigrationInterface {
    name = 'CreateProduct1729352480368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_status_enum" AS ENUM('draft', 'published', 'unpublished')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "slug" character varying NOT NULL, "name" character varying NOT NULL, "status" "public"."product_status_enum" NOT NULL DEFAULT 'draft', CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_status_enum"`);
    }

}
