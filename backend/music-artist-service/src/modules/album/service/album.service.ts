import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/entities/album/entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async getAlbumById(id: string): Promise<Album> {
    return this.albumRepository.findOne({
      where: {
        id,
      },
      relations: {
        songs: true,
      },
    });
  }

  async getAlbumByName(title: string): Promise<Album[]> {
    return this.albumRepository.find({
      where: {
        title,
      },
      relations: {
        songs: true,
        artist: true,
      },
    });
  }

  async getAlbumByArtistId(artistId: string): Promise<Album[]> {
    return this.albumRepository.find({
      where: {
        artist: {
          id: artistId,
        },
      },
    });
  }
}
