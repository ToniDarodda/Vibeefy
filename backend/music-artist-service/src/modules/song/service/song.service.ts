import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/entities/song/entity';
import { Repository } from 'typeorm';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
  ) {}

  async getSongById(id: string): Promise<Song> {
    return this.songRepository.findOne({
      where: {
        id,
      },
      relations: {
        album: {
          artist: true,
        },
      },
    });
  }

  async getSongsByName(name: string): Promise<Song[]> {
    return this.songRepository.find({
      where: {
        name,
      },
      relations: {
        album: {
          artist: true,
        },
      },
    });
  }

  async getSongsByAlbumId(albumId: string): Promise<Song[]> {
    return this.songRepository.find({
      where: {
        album: {
          id: albumId,
        },
      },
      relations: {
        album: {
          artist: true,
          songs: true,
        },
      },
    });
  }
}
