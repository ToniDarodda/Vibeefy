import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMe1709572992196 implements MigrationInterface {
    name = 'RenameMe1709572992196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_song" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_song" DROP COLUMN "name"`);
    }

}
