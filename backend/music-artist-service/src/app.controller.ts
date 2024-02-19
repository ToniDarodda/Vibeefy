import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ArtistService } from './app.service';

@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @MessagePattern({ cmd: 'get_artist' })
  getArtist(data: any): string {
    return this.artistService.getHello(data);
  }
}
