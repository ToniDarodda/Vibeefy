import { AlbumInterface } from './album';

export interface Song {
  id: string;
  title: string;
  songDuration: number;
  thumbnails: string;
  videoId: string;
}

export interface RawSong {
  id: string;
  title: string;
  songDuration: number;
  thumbnails: string;
  videoId: string;
  album: AlbumInterface;
}

export interface SongInterface {
  id: string;
  title: string;
  songDuration: number;
  thumbnails: string;
  videoId: string;
  trackNumber?: number;
  albumName?: string;
}

export interface LovedSongToSong {
  id: string;
  songId: string;
}

export interface LovedSong {
  lovedSongToSong: LovedSongToSong[];
}
