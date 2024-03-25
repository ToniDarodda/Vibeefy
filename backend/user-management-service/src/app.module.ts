import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';

import { LovedSongModule } from './modules/lovedSong/lovedSong.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { UserModule } from './modules/user/user.module';
import { MicroServiceModule } from './modules/artist-manager/artist-manager.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

const { ARTISTHOST, ARTISTPORT } = process.env;

const modules = [
  UserModule,
  PlaylistModule,
  LovedSongModule,
  MicroServiceModule,
];

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MUSIC_ARTIST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: ARTISTHOST,
          port: +ARTISTPORT,
        },
      },
    ]),
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot(),
    ...modules,
  ],
})
export class AppModule {}
