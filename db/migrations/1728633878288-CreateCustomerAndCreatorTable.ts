import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomerAndCreatorTable1728633878288 implements MigrationInterface {
    name = 'CreateCustomerAndCreatorTable1728633878288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "creator" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "display_name" character varying NOT NULL, "bio" text, "slug" character varying NOT NULL, "social_facebook" character varying, "social_instagram" character varying, "social_linkedin" character varying, "social_twitter" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, CONSTRAINT "REL_bceab0a953e7603ff5fd64f528" UNIQUE ("user_id"), CONSTRAINT "PK_43e489c9896f9eb32f7a0b912c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone_number" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, CONSTRAINT "REL_5d1f609371a285123294fddcf3" UNIQUE ("user_id"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff" ALTER COLUMN "first_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff" ALTER COLUMN "last_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "creator" ADD CONSTRAINT "FK_bceab0a953e7603ff5fd64f5286" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_5d1f609371a285123294fddcf3a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_5d1f609371a285123294fddcf3a"`);
        await queryRunner.query(`ALTER TABLE "creator" DROP CONSTRAINT "FK_bceab0a953e7603ff5fd64f5286"`);
        await queryRunner.query(`ALTER TABLE "staff" ALTER COLUMN "last_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff" ALTER COLUMN "first_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "creator"`);
    }

}
