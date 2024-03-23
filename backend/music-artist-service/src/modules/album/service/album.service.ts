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
        artist: true,
      },
    });
  }

  async getAlbumByName(title: string, take = 30, skip = 0): Promise<Album[]> {
    return this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.songs', 'songs')
      .leftJoinAndSelect('album.artist', 'artist')
      .where('album.title ILIKE :title', { title: `%${title}%` })
      .orWhere('artist.name ILIKE :name', { name: `%${title}%` })
      .take(take)
      .skip(skip)
      .getMany();
  }

  async getAlbumBySongId(songId: string): Promise<Album> {
    const album = await this.albumRepository.findOne({
      where: {
        songs: {
          id: songId,
        },
      },
    });

    console.log(album);

    return await this.albumRepository.findOne({
      where: {
        albumId: album.albumId,
      },
      relations: {
        artist: true,
        songs: true,
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
