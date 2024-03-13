import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMe1709578995723 implements MigrationInterface {
    name = 'RenameMe1709578995723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_song" ADD "song_duration" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_song" DROP COLUMN "song_duration"`);
    }

}
