import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/entities/song/entity';
import { SongController } from './controller/song.controller';
import { SongService } from './service/song.service';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
