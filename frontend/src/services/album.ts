import { AlbumInterfaceWithSongs } from '../interfaces';
import { Fetch } from '../utils/axios';

class AlbumService {
  async getAlbumByName(
    name: string,
    take?: number,
    skip?: number,
  ): Promise<AlbumInterfaceWithSongs[]> {
    const { data: albums }: { data: AlbumInterfaceWithSongs[] } =
      await Fetch.get<AlbumInterfaceWithSongs[]>(
        `/album-name-info?name=${name}&take=${take}&skip=${skip}`,
      );

    return albums;
  }

  async getAlbumById(albumId: string): Promise<AlbumInterfaceWithSongs> {
    const { data: album }: { data: AlbumInterfaceWithSongs } = await Fetch.get(
      `album-info/${albumId}`,
    );
    return album;
  }

  async getAlbumBySongId(songId: string): Promise<AlbumInterfaceWithSongs> {
    const { data: album }: { data: AlbumInterfaceWithSongs } = await Fetch.get(
      `album-info/song/${songId}`,
    );
    return album;
  }
}

export const albumService: AlbumService = new AlbumService();
