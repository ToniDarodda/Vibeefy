import { Injectable } from '@nestjs/common';
import { Artist } from 'src/entities/artist/entity';
import { Repository } from 'typeorm';
import { ArtistGetById, ArtistGetByPseudo } from '../dto/base.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async getArtistById(artistId: ArtistGetById): Promise<Artist> {
    return this.artistRepository.findOne({
      where: {
        ...artistId,
      },
      relations: {
        albums: {
          songs: true,
        },
      },
    });
  }

  async getArtistByPseudo(pseudo: ArtistGetByPseudo): Promise<Artist[]> {
    return this.artistRepository
      .createQueryBuilder('artist')
      .orWhere('artist.name ILIKE :name', { name: `%${pseudo.name}%` })
      .take(30)
      .getMany();
  }

  async getAllArtistRandom(take: number, skip: number): Promise<Artist[]> {
    return this.artistRepository.find({
      order: {
        name: 'ASC',
      },
      take,
      skip,
    });
  }
}
