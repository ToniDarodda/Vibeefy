import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameMe1708416389220 implements MigrationInterface {
  name = 'RenameMe1708416389220';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "loved_song" ADD "user_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "loved_song" ADD CONSTRAINT "FK_aabca222158f331c1a961c0e6b5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loved_song" DROP CONSTRAINT "FK_aabca222158f331c1a961c0e6b5"`,
    );
    await queryRunner.query(`ALTER TABLE "loved_song" DROP COLUMN "user_id"`);
  }
}
