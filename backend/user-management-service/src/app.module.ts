import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ArtistService } from './app.service';
import { UserController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { LovedSongModule } from './modules/lovedSong/lovedSong.module';

const modules = [UserModule, PlaylistModule, LovedSongModule];

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MUSIC_ARTIST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ]),
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot(),
    ...modules,
  ],
  providers: [ArtistService],
  controllers: [UserController],
})
export class AppModule {}
