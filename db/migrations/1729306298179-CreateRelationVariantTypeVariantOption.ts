import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationVariantTypeVariantOption1729306298179 implements MigrationInterface {
    name = 'CreateRelationVariantTypeVariantOption1729306298179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variant_option" ADD "variant_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "variant_option" ADD CONSTRAINT "FK_5cac21c5aaabe785d3453658440" FOREIGN KEY ("variant_type_id") REFERENCES "variant_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "variant_option" DROP CONSTRAINT "FK_5cac21c5aaabe785d3453658440"`);
        await queryRunner.query(`ALTER TABLE "variant_option" DROP COLUMN "variant_type_id"`);
    }

}
