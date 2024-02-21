import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ArtistService {
  constructor(@Inject('MUSIC_ARTIST_SERVICE') private client: ClientProxy) {}

  async getArtistInfo(artistId: string) {
    return this.client.send({ cmd: 'get_artist_by_id' }, { id: artistId });
  }

  async getAlbumInfo(albumId: string) {
    return this.client.send({ cmd: 'get_album_by_id' }, { id: albumId });
  }
  async getAlbumByNameInfo(name: string) {
    return this.client.send({ cmd: 'get_album_by_name' }, { name: name });
  }
  async getSongByIdInfo(id: string) {
    const observable = this.client.send({ cmd: 'get_song_by_id' }, { id: id });

    return firstValueFrom(observable);
  }
  async getSongsInfo(albumId: string) {
    const observable = this.client.send(
      { cmd: 'get_songs_by_album_id' },
      { id: albumId },
    );

    return firstValueFrom(observable);
  }
}
