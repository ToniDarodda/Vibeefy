import { CreatePlaylist, PlaylistType } from '../interfaces/playlist';
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
}

export const playlistService: PlaylistService = new PlaylistService();
