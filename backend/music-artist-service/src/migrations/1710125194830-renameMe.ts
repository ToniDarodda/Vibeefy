import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMe1710125194830 implements MigrationInterface {
    name = 'RenameMe1710125194830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "UQ_6f387371fcb20bed907a49a69fa" UNIQUE ("video_youtube_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "UQ_6f387371fcb20bed907a49a69fa"`);
    }

}
