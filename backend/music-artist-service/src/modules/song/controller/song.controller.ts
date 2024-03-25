import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { SongService } from '../service/song.service';
import {
  SongGetByAlbumId,
  SongGetById,
  SongGetByName,
  SongsGetByIdsDTO,
} from '../dto/base.dto';
import { Song } from 'src/entities/song/entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class SongController {
  constructor(private readonly songService: SongService) {}

  @MessagePattern({ cmd: 'get_song_by_id' })
  @UseInterceptors(ClassSerializerInterceptor)
  async getSongById({ id }: SongGetById): Promise<Song> {
    return this.songService.getSongById(id);
  }

  @MessagePattern({ cmd: 'get_songs_info_by_ids' })
  @UseInterceptors(ClassSerializerInterceptor)
  async getSongsInfoByIds({ ids }: SongsGetByIdsDTO): Promise<Song[]> {
    return this.songService.getSongsInfoByIds(ids);
  }

  @MessagePattern({ cmd: 'get_songs_by_name' })
  @UseInterceptors(ClassSerializerInterceptor)
  async getSongsByName({ name }: SongGetByName): Promise<Song[]> {
    return await this.songService.getSongsByName(name);
  }

  @MessagePattern({ cmd: 'get_songs_by_album_id' })
  @UseInterceptors(ClassSerializerInterceptor)
  async getSonsByAlbumid({ id }: SongGetByAlbumId): Promise<Song[]> {
    return await this.songService.getSongsByAlbumId(id);
  }
}
