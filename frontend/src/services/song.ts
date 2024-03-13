import { Song } from '../interfaces/song';
import { Fetch } from '../utils/axios';

class SongService {
  async getPlaylist(songId: string): Promise<Song> {
    const { data: song }: { data: Song } = await Fetch.get<Song>(
      `/songs/${songId}`,
    );

    return song;
  }
}

export const songService: SongService = new SongService();
