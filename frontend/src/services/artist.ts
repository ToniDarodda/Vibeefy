import { ArtistInfo } from '../interfaces';
import { Fetch } from '../utils';

class ArtistService {
  async getArtistInfo(artistId: string): Promise<ArtistInfo> {
    console.log(artistId, 'id de ');
    const { data: artist }: { data: ArtistInfo } = await Fetch.get(
      `artist-info/${artistId}`,
    );

    return artist;
  }
}

export const artistService: ArtistService = new ArtistService();
