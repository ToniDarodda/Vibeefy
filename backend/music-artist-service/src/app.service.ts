import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistService {
  getHello(data: any): string {
    return `Informations de l'artiste pour l'ID ${data.id}`;
  }
}
