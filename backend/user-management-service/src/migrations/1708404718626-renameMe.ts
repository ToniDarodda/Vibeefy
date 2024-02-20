import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameMe1708404718626 implements MigrationInterface {
  name = 'RenameMe1708404718626';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "playlist" DROP CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loved_song_to_song" DROP CONSTRAINT "FK_2ac71fd5cf4dbff02e2a47fd017"`,
    );
    await queryRunner.query(
      `ALTER TABLE "playlist" RENAME COLUMN "userId" TO "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loved_song_to_song" RENAME COLUMN "lovedSongId" TO "loved_song_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "playlist" ADD CONSTRAINT "FK_a95382384c5ba920429ba111211" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "loved_song_to_song" ADD CONSTRAINT "FK_7eb9e3a2ca303ab7dda634fcb65" FOREIGN KEY ("loved_song_id") REFERENCES "loved_song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loved_song_to_song" DROP CONSTRAINT "FK_7eb9e3a2ca303ab7dda634fcb65"`,
    );
    await queryRunner.query(
      `ALTER TABLE "playlist" DROP CONSTRAINT "FK_a95382384c5ba920429ba111211"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loved_song_to_song" RENAME COLUMN "loved_song_id" TO "lovedSongId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "playlist" RENAME COLUMN "user_id" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loved_song_to_song" ADD CONSTRAINT "FK_2ac71fd5cf4dbff02e2a47fd017" FOREIGN KEY ("lovedSongId") REFERENCES "loved_song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "playlist" ADD CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
