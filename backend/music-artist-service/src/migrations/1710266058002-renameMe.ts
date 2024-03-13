import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMe1710266058002 implements MigrationInterface {
    name = 'RenameMe1710266058002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ADD "profile_picture" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "profile_picture"`);
    }

}
