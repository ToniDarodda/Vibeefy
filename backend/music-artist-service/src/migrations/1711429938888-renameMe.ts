import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMe1711429938888 implements MigrationInterface {
    name = 'RenameMe1711429938888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "featured_artist" ("songId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_a37b82269327ea85a600cdadd15" PRIMARY KEY ("songId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_50144952c4d0557a9b598cccb4" ON "featured_artist" ("songId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a441e66e3865e0eda8ab2460b6" ON "featured_artist" ("artistId") `);
        await queryRunner.query(`ALTER TABLE "featured_artist" ADD CONSTRAINT "FK_50144952c4d0557a9b598cccb49" FOREIGN KEY ("songId") REFERENCES "song"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "featured_artist" ADD CONSTRAINT "FK_a441e66e3865e0eda8ab2460b69" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "featured_artist" DROP CONSTRAINT "FK_a441e66e3865e0eda8ab2460b69"`);
        await queryRunner.query(`ALTER TABLE "featured_artist" DROP CONSTRAINT "FK_50144952c4d0557a9b598cccb49"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a441e66e3865e0eda8ab2460b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_50144952c4d0557a9b598cccb4"`);
        await queryRunner.query(`DROP TABLE "featured_artist"`);
    }

}
