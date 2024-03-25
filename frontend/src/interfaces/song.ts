import { ArtistInterface } from './artist';

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

interface AlbumInterface {
  id: string;
  title: string;
  thumbnails: string;
  year: string;
  description?: string;
  albumId: string;
  artist: ArtistInterface;
}

export interface LovedSongToSong {
  id: string;
  songId: string;
}

export interface LovedSong {
  lovedSongToSong: LovedSongToSong[];
}
