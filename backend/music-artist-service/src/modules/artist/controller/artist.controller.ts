import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ArtistService } from '../service/artist.service';
import { Artist } from 'src/entities/artist/entity';
import { ArtistGet, ArtistGetById, ArtistGetByPseudo } from '../dto/base.dto';

@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @MessagePattern({ cmd: 'get_artist_by_id' })
  @UseInterceptors(ClassSerializerInterceptor)
  async getArtistById(data: ArtistGetById): Promise<Artist> {
    return await this.artistService.getArtistById(data);
  }

  @MessagePattern({ cmd: 'get_artist_by_pseudo' })
  @UseInterceptors(ClassSerializerInterceptor)
  async getArtistByPseudo(data: ArtistGetByPseudo): Promise<Artist[]> {
    return await this.artistService.getArtistByPseudo(data);
  }

  @MessagePattern({ cmd: 'get_artist' })
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllArtistRandom({ take, skip }: ArtistGet): Promise<Artist[]> {
    return await this.artistService.getAllArtistRandom(take, skip);
  }
}
