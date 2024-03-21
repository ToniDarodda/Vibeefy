import { LovedSong } from '../interfaces/song';
import { Fetch } from '../utils';

export class LovedSongService {
  async createLoveSong(songId: string, isPublic: boolean): Promise<LovedSong> {
    const { data: lovedSong }: { data: LovedSong } = await Fetch.post(
      `/love-song/${songId}`,
      isPublic,
    );

    return lovedSong;
  }

  async getAllLovedSong(): Promise<LovedSong[]> {
    const { data: lovedSongs }: { data: LovedSong[] } =
      await Fetch.get<LovedSong[]>(`/love-song`);

    return lovedSongs;
  }

  async deleteLovedSong(songId: string): Promise<void> {
    await Fetch.delete<void>(`/love-song/${songId}`);
  }
}

export const lovedSongService: LovedSongService = new LovedSongService();
