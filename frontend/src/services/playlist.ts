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

  async deletePlaylist(playlistId: string): Promise<void> {
    await Fetch.delete<void>(`playlist/${playlistId}`);
  }

  async generatePlaylistCode(playlistId: string): Promise<string> {
    const { data: code }: { data: string } = await Fetch.post<string>(
      `playlist/generate-code`,
      { id: playlistId },
    );
    return code;
  }

  async usePlaylistCode(code: string): Promise<void> {
    await Fetch.post<void>(`/playlist/use-code`, { code });
  }
}

export const playlistService: PlaylistService = new PlaylistService();
