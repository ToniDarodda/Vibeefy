import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMe1710465534731 implements MigrationInterface {
    name = 'RenameMe1710465534731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "playlist_song" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "song_id" character varying NOT NULL, "name" character varying, "song_duration" integer, "playlist_id" uuid, CONSTRAINT "PK_241dd4c57dba28d1f14f9308cf8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "name" character varying(100) NOT NULL, "public" boolean NOT NULL DEFAULT false, "share_code" character varying, "user_id" uuid, CONSTRAINT "UQ_86222fd0821eb140c1d79c27f7b" UNIQUE ("share_code"), CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loved_song_to_song" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "song_id" character varying NOT NULL, "loved_song_id" uuid, CONSTRAINT "PK_fca750a3eba5bdac91bfeb0c5cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loved_song" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "public" boolean NOT NULL DEFAULT false, "user_id" uuid, CONSTRAINT "PK_f90795747a6578b3d7c42893037" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "version" integer NOT NULL DEFAULT '0', "pseudo" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "date_of_birth" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist_shared_to_user_user" ("playlistId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_1b3461a343c047283e208247205" PRIMARY KEY ("playlistId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bc3a7fe9a95567eb1923934841" ON "playlist_shared_to_user_user" ("playlistId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3984c90b00f187265e2fa3c17b" ON "playlist_shared_to_user_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "playlist_song" ADD CONSTRAINT "FK_404e93f5821bb1475c17b08882a" FOREIGN KEY ("playlist_id") REFERENCES "playlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_a95382384c5ba920429ba111211" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loved_song_to_song" ADD CONSTRAINT "FK_7eb9e3a2ca303ab7dda634fcb65" FOREIGN KEY ("loved_song_id") REFERENCES "loved_song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loved_song" ADD CONSTRAINT "FK_aabca222158f331c1a961c0e6b5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_shared_to_user_user" ADD CONSTRAINT "FK_bc3a7fe9a95567eb19239348419" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist_shared_to_user_user" ADD CONSTRAINT "FK_3984c90b00f187265e2fa3c17b2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_shared_to_user_user" DROP CONSTRAINT "FK_3984c90b00f187265e2fa3c17b2"`);
        await queryRunner.query(`ALTER TABLE "playlist_shared_to_user_user" DROP CONSTRAINT "FK_bc3a7fe9a95567eb19239348419"`);
        await queryRunner.query(`ALTER TABLE "loved_song" DROP CONSTRAINT "FK_aabca222158f331c1a961c0e6b5"`);
        await queryRunner.query(`ALTER TABLE "loved_song_to_song" DROP CONSTRAINT "FK_7eb9e3a2ca303ab7dda634fcb65"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_a95382384c5ba920429ba111211"`);
        await queryRunner.query(`ALTER TABLE "playlist_song" DROP CONSTRAINT "FK_404e93f5821bb1475c17b08882a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3984c90b00f187265e2fa3c17b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc3a7fe9a95567eb1923934841"`);
        await queryRunner.query(`DROP TABLE "playlist_shared_to_user_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "loved_song"`);
        await queryRunner.query(`DROP TABLE "loved_song_to_song"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "playlist_song"`);
    }

}
