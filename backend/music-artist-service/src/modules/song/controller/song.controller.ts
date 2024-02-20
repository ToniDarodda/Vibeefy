import { Controller } from '@nestjs/common';
import { SongService } from '../service/song.service';
import { SongGetById, SongGetByName } from '../dto/base.dto';
import { Song } from 'src/entities/song/entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class SongController {
  constructor(private readonly songService: SongService) {}

  @MessagePattern({ cmd: 'get_song_by_id' })
  async getSongById({ id }: SongGetById): Promise<Song> {
    return this.songService.getSongById(id);
  }

  @MessagePattern({ cmd: 'get_songs_by_name' })
  async getSongsByName({ name }: SongGetByName): Promise<Song[]> {
    return await this.songService.getSongsByName(name);
  }

  @MessagePattern({ cmd: 'get_songs_by_album_id' })
  async getSonsByAlbumid(albumId: string): Promise<Song[]> {
    return await this.songService.getSongsByAlbumId(albumId);
  }
}
