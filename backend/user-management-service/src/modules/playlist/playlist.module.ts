import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Playlist, PlaylistSong } from 'src/entities/playlist/entity';
import { PlaylistController } from './controller/playlist.controller';
import { PlaylistService } from './service/playlist.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ArtistManagerController } from '../artist-manager/controller/artist-manager.controller';
import { ArtistManagerService } from '../artist-manager/service/artist-manager.service';

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
    TypeOrmModule.forFeature([Playlist, PlaylistSong]),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, ArtistManagerController, ArtistManagerService],
})
export class PlaylistModule {}
