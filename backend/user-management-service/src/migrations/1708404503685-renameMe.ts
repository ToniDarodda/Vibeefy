import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMe1708404503685 implements MigrationInterface {
    name = 'RenameMe1708404503685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "loved_song_to_song" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP DEFAULT now(), "version" integer NOT NULL DEFAULT '0', "song_id" character varying NOT NULL, "lovedSongId" uuid, CONSTRAINT "PK_fca750a3eba5bdac91bfeb0c5cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loved_song" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP DEFAULT now(), "version" integer NOT NULL DEFAULT '0', "public" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_f90795747a6578b3d7c42893037" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist_song" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP DEFAULT now(), "version" integer NOT NULL DEFAULT '0', "song_id" character varying NOT NULL, "playlist_id" uuid, CONSTRAINT "PK_241dd4c57dba28d1f14f9308cf8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP DEFAULT now(), "version" integer NOT NULL DEFAULT '0', "name" character varying(100) NOT NULL, "public" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP DEFAULT now(), "version" integer NOT NULL DEFAULT '0', "fist_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loved_song_to_song" ADD CONSTRAINT "FK_2ac71fd5cf4dbff02e2a47fd017" FOREIGN KEY ("lovedSongId") REFERENCES "loved_song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_song" ADD CONSTRAINT "FK_404e93f5821bb1475c17b08882a" FOREIGN KEY ("playlist_id") REFERENCES "playlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b"`);
        await queryRunner.query(`ALTER TABLE "playlist_song" DROP CONSTRAINT "FK_404e93f5821bb1475c17b08882a"`);
        await queryRunner.query(`ALTER TABLE "loved_song_to_song" DROP CONSTRAINT "FK_2ac71fd5cf4dbff02e2a47fd017"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "playlist_song"`);
        await queryRunner.query(`DROP TABLE "loved_song"`);
        await queryRunner.query(`DROP TABLE "loved_song_to_song"`);
    }

}
