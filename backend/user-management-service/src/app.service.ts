// user.service.ts dans user-management-service
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(@Inject('MUSIC_ARTIST_SERVICE') private client: ClientProxy) {}

  async getArtistInfo(artistId: number) {
    return this.client.send({ cmd: 'get_artist' }, { id: artistId }).toPromise();
  }
}
