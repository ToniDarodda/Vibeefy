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

  async getAlbumByName(title: string, take = 20, skip = 0): Promise<Album[]> {
    return this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.songs', 'songs')
      .leftJoinAndSelect('album.artist', 'artist')
      .where('album.title ILIKE :title', { title: `%${title}%` })
      .orWhere('artist.name ILIKE :name', { name: `%${title}%` })
      .orderBy('album.year', 'DESC')
      .take(take)
      .skip(skip)
      .getMany();
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
