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
      .leftJoinAndSelect('album.songs', 'songs') // Joindre les chansons de l'album
      .leftJoinAndSelect('album.artist', 'artist') // Joindre l'artiste de l'album
      .where('album.title ILIKE :title', { title: `%${title}%` }) // Recherche insensible à la casse par titre d'album
      .orWhere('artist.name ILIKE :name', { name: `%${title}%` }) // Recherche insensible à la casse par nom d'artiste
      .orderBy('album.title', 'ASC') // Trier les albums par titre
      .take(take) // Limiter le nombre de résultats
      .skip(skip) // Passer un certain nombre de résultats
      .getMany(); // Récupérer les albums
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
