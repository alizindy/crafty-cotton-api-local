import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStaffRoleTableAndAddToStaff1729209703464 implements MigrationInterface {
    name = 'CreateStaffRoleTableAndAddToStaff1729209703464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "staff_role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "can_access_order" boolean NOT NULL DEFAULT false, "can_access_transaction" boolean NOT NULL DEFAULT false, "can_access_order_payment" boolean NOT NULL DEFAULT false, "can_access_transaction_payment" boolean NOT NULL DEFAULT false, "can_access_payout_payment" boolean NOT NULL DEFAULT false, "can_access_payout_transaction" boolean NOT NULL DEFAULT false, "can_check_printing" boolean NOT NULL DEFAULT false, "can_download_art_work_printing" boolean NOT NULL DEFAULT false, "can_update_information_printing" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "PK_c3fe01125c99573751fe5e55666" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "staff" ADD "staff_role_id" integer`);
        await queryRunner.query(`ALTER TABLE "staff" ADD CONSTRAINT "FK_3e63041301f49bb484112b75a0f" FOREIGN KEY ("staff_role_id") REFERENCES "staff_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff" DROP CONSTRAINT "FK_3e63041301f49bb484112b75a0f"`);
        await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "staff_role_id"`);
        await queryRunner.query(`DROP TABLE "staff_role"`);
    }

}
