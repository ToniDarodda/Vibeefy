import {
  CreatePlaylist,
  PlaylistSong,
  PlaylistType,
} from '../interfaces/playlist';
import { Fetch } from '../utils/axios';

class PlaylistService {
  async createPlaylist(data: CreatePlaylist): Promise<PlaylistType> {
    const { data: playlist }: { data: PlaylistType } =
      await Fetch.post<PlaylistType>('/playlist', data);

    return playlist;
  }

  async getPlaylist(): Promise<PlaylistType[]> {
    const { data: playlists }: { data: PlaylistType[] } =
      await Fetch.get<PlaylistType[]>(`/playlist/by-user/me`);

    return playlists;
  }

  async addSongToPlaylist(
    name: string,
    songId: string,
    playlistId: string,
    songDuration: number,
  ): Promise<PlaylistSong> {
    const { data: addedSong }: { data: PlaylistSong } =
      await Fetch.post<PlaylistSong>(`playlist/${playlistId}/songs`, {
        name,
        songId,
        songDuration,
      });

    return addedSong;
  }
}

export const playlistService: PlaylistService = new PlaylistService();
