import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMe1710121974448 implements MigrationInterface {
    name = 'RenameMe1710121974448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_c529927ae410af49faaf2e239a5"`);
        await queryRunner.query(`ALTER TABLE "album" RENAME COLUMN "artistId" TO "artist_id"`);
        await queryRunner.query(`ALTER TABLE "song" RENAME COLUMN "albumId" TO "album_id"`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_ecbc0c0cfffc519f7f2407b0465" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_c1b6644942ac9914001543107d5" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_c1b6644942ac9914001543107d5"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_ecbc0c0cfffc519f7f2407b0465"`);
        await queryRunner.query(`ALTER TABLE "song" RENAME COLUMN "album_id" TO "albumId"`);
        await queryRunner.query(`ALTER TABLE "album" RENAME COLUMN "artist_id" TO "artistId"`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_c529927ae410af49faaf2e239a5" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
