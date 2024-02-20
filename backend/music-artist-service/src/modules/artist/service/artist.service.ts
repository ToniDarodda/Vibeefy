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
    });
  }

  async getArtistByPseudo(pseudo: ArtistGetByPseudo): Promise<Artist[]> {
    return this.artistRepository.find({
      where: {
        ...pseudo,
      },
    });
  }
}
