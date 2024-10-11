import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStaffTable1728542731165 implements MigrationInterface {
    name = 'CreateStaffTable1728542731165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "staff" ("id" SERIAL NOT NULL, "first_name" character varying, "last_name" character varying, "job" character varying, "department" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, CONSTRAINT "REL_cec9365d9fc3a3409158b645f2" UNIQUE ("user_id"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "staff" ADD CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff" DROP CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'staff'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`DROP TABLE "staff"`);
    }

}
