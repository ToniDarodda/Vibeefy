import { RawSong, Song } from '../interfaces/song';
import { Fetch } from '../utils/axios';

class SongService {
  async getPlaylist(songId: string): Promise<Song> {
    const { data: song }: { data: Song } = await Fetch.get<Song>(
      `/songs/${songId}`,
    );

    return song;
  }

  async getSongsInfoByIds(songIds: string[]): Promise<Song[]> {
    const { data: songsInfo }: { data: Song[] } = await Fetch.get<Song[]>(
      `/songs/info?${songIds.map((id: string) => `songId=${id}&`)}`.replaceAll(
        ',',
        '',
      ),
    );
    return songsInfo;
  }

  async getSongsByName(
    songName: string,
    numberFetch: number,
  ): Promise<RawSong[]> {
    const { data: songs }: { data: RawSong[] } = await Fetch.get(
      `/songs/name?name=${songName}&take=${numberFetch}&skip=${0}`,
    );

    return songs;
  }
}

export const songService: SongService = new SongService();
