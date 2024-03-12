import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ArtistService } from '../service/artist.service';
import { Artist } from 'src/entities/artist/entity';
import { ArtistGet, ArtistGetById, ArtistGetByPseudo } from '../dto/base.dto';

@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @MessagePattern({ cmd: 'get_artist_by_id' })
  async getArtistById(data: ArtistGetById): Promise<Artist> {
    return await this.artistService.getArtistById(data);
  }

  @MessagePattern({ cmd: 'get_artist_by_pseudo' })
  async getArtistByPseudo(data: ArtistGetByPseudo): Promise<Artist[]> {
    return await this.artistService.getArtistByPseudo(data);
  }

  @MessagePattern({ cmd: 'get_artist' })
  async getAllArtistRandom({ take, skip }: ArtistGet): Promise<Artist[]> {
    return await this.artistService.getAllArtistRandom(take, skip);
  }
}
