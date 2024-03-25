import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/entities/song/entity';
import { In, Repository } from 'typeorm';

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

  async getSongsInfoByIds(ids: string[]): Promise<Song[]> {
    return this.songRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async getSongsByName(title: string): Promise<Song[]> {
    return await this.songRepository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.album', 'album') // Jointure avec la table 'album'
      .leftJoinAndSelect('album.artist', 'artist') // Jointure avec la table 'artist' à partir de l'album
      .where('song.title ILIKE :title', { title: `%${title}%` }) // Condition de recherche insensible à la casse sur le titre de la chanson
      .orWhere('artist.name ILIKE :name', { name: `%${title}%` }) // Condition de recherche insensible à la casse sur le titre de la chanson
      .take(40)
      .getMany(); // Récupère toutes les chansons correspondantes avec leurs albums et artistes
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
