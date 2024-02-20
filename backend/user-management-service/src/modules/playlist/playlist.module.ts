import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from 'src/entities/playlist/entity';
import { PlaylistController } from './controller/playlist.controller';
import { PlaylistService } from './service/playlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
