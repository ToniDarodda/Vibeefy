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
}

export const albumService: AlbumService = new AlbumService();
