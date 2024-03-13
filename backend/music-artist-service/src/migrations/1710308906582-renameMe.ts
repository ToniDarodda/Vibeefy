import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMe1710308906582 implements MigrationInterface {
    name = 'RenameMe1710308906582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" ADD "track_number" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "track_number"`);
    }

}
