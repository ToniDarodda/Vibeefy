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
}
