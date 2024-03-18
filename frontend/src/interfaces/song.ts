export interface Song {
  id: string;
  title: string;
  songDuration: number;
  thumbnails: string;
  videoId: string;
}

interface LovedSongToSong {
  id: string;
  songId: string;
}

export interface LovedSong {
  id: string;
  public: boolean;
  lovedSongToSong: LovedSongToSong[];
}
