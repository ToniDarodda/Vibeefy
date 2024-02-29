import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMe1709176568212 implements MigrationInterface {
    name = 'RenameMe1709176568212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "last_name" TO "pseudo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "pseudo" TO "last_name"`);
    }

}
