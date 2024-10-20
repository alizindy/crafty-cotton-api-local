import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationBetweenProductAndCreator1729434244492 implements MigrationInterface {
    name = 'CreateRelationBetweenProductAndCreator1729434244492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "creator_id" integer`);
        await queryRunner.query(`ALTER TABLE "product_collection" ADD "creator_id" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_65247c221ebc24fe4f9084ef682" FOREIGN KEY ("creator_id") REFERENCES "creator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_collection" ADD CONSTRAINT "FK_dada562f913d51491c540718a74" FOREIGN KEY ("creator_id") REFERENCES "creator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_collection" DROP CONSTRAINT "FK_dada562f913d51491c540718a74"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_65247c221ebc24fe4f9084ef682"`);
        await queryRunner.query(`ALTER TABLE "product_collection" DROP COLUMN "creator_id"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "creator_id"`);
    }

}
