import { ArtistInfo, RawArtist } from '../interfaces';
import { Fetch } from '../utils';

class ArtistService {
  async getArtistInfo(artistId: string): Promise<ArtistInfo> {
    const { data: artist }: { data: ArtistInfo } = await Fetch.get(
      `artist-info/${artistId}`,
    );

    return artist;
  }

  async getArtistByName(artistName: string): Promise<RawArtist[]> {
    const { data: rawArtist }: { data: RawArtist[] } = await Fetch.get(
      `artist-info/name/${artistName}`,
    );

    return rawArtist;
  }
}

export const artistService: ArtistService = new ArtistService();
