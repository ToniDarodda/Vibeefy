export interface Song {
  id: string;
  title: string;
  songDuration: number;
  thumbnails: string;
  videoId: string;
}

export interface LovedSongToSong {
  id: string;
  songId: string;
}

export interface LovedSong {
  lovedSongToSong: LovedSongToSong[];
}
