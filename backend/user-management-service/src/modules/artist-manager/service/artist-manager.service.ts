import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ArtistManagerService {
  constructor(@Inject('MUSIC_ARTIST_SERVICE') private client: ClientProxy) {}

  async getArtistInfo(artistId: string) {
    return this.client.send({ cmd: 'get_artist_by_id' }, { id: artistId });
  }

  async getArtistByPseudo(artistName: string) {
    return this.client.send(
      { cmd: 'get_artist_by_pseudo' },
      { name: artistName },
    );
  }

  async getArtist(take = 20, skip?: number) {
    return this.client.send({ cmd: 'get_artist' }, { take, skip });
  }

  async getAlbumInfo(albumId: string) {
    return this.client.send({ cmd: 'get_album_by_id' }, { id: albumId });
  }
  async getAlbumInfoBySongId(albumId: string) {
    return this.client.send({ cmd: 'get_album_by_song_id' }, { id: albumId });
  }

  async getAlbumByNameInfo(name: string, take?: number, skip?: number) {
    return this.client.send(
      { cmd: 'get_album_by_name' },
      { name: name, take, skip },
    );
  }

  async getSongByIdInfo(id: string) {
    const observable = this.client.send({ cmd: 'get_song_by_id' }, { id: id });

    return firstValueFrom(observable);
  }

  async getSongsByName(name: string, take?: number, skip?: number) {
    return this.client.send({ cmd: 'get_songs_by_name' }, { name, take, skip });
  }

  async getSongsInfoByIds(ids: string[]) {
    return this.client.send({ cmd: 'get_songs_info_by_ids' }, { ids: ids });
  }

  async getSongsInfo(albumId: string) {
    const observable = this.client.send(
      { cmd: 'get_songs_by_album_id' },
      { id: albumId },
    );

    return firstValueFrom(observable);
  }
}
