import { AlbumInterface } from '../interfaces/artist';
import { Fetch } from '../utils/axios';

class AlbumService {
  async getAlbumByName(
    name: string,
    take?: number,
    skip?: number,
  ): Promise<AlbumInterface[]> {
    const { data: albums }: { data: AlbumInterface[] } = await Fetch.get<
      AlbumInterface[]
    >(`/album-name-info?name=${name}&take=${take}&skip=${skip}`);

    return albums;
  }

  async getAlbumById(albumId: string): Promise<AlbumInterface> {
    const { data: album }: { data: AlbumInterface } = await Fetch.get(
      `album-info/${albumId}`,
    );
    return album;
  }

  async getAlbumBySongId(songId: string): Promise<AlbumInterface> {
    const { data: album }: { data: AlbumInterface } = await Fetch.get(
      `album-info/song/${songId}`,
    );
    return album;
  }
}

export const albumService: AlbumService = new AlbumService();
