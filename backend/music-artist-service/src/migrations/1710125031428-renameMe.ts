import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMe1710125031428 implements MigrationInterface {
    name = 'RenameMe1710125031428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "UQ_dffc94b4dfe16468eebe5f3e8f5" UNIQUE ("album_youtube_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "UQ_dffc94b4dfe16468eebe5f3e8f5"`);
    }

}
