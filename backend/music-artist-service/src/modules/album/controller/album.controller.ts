import { Controller } from '@nestjs/common';
import { AlbumService } from '../service/album.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  AlbumGetById,
  AlbumGetByName,
  AlbumGetBySongId,
} from '../dto/base.dto';
import { Album } from 'src/entities/album/entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Album')
@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @MessagePattern({ cmd: 'get_album_by_id' })
  async getAlbumById({ id }: AlbumGetById): Promise<Album> {
    return await this.albumService.getAlbumById(id);
  }

  @MessagePattern({ cmd: 'get_album_by_name' })
  async getAlbumByName({ name, skip, take }: AlbumGetByName): Promise<Album[]> {
    return await this.albumService.getAlbumByName(name, take, skip);
  }
  @MessagePattern({ cmd: 'get_album_by_song_id' })
  async getAlbumBySongId({ id }: AlbumGetBySongId): Promise<Album> {
    return await this.albumService.getAlbumBySongId(id);
  }
}
