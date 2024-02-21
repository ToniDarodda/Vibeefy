import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LovedSong, LovedSongToSong } from 'src/entities/lovedSong/entity';
import { LovedSongController } from './controller/lovedSong.controller';
import { LovedSongService } from './service/lovedSong.service';

@Module({
  imports: [TypeOrmModule.forFeature([LovedSong, LovedSongToSong])],
  controllers: [LovedSongController],
  providers: [LovedSongService],
})
export class LovedSongModule {}
