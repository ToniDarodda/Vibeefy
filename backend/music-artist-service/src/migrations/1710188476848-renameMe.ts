import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMe1710188476848 implements MigrationInterface {
    name = 'RenameMe1710188476848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" ADD "release_date" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "release_date"`);
    }

}
