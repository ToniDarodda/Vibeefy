import { ArtistInterface } from './artist';
import { SongInterface } from './song';

export interface AlbumInterface {
  id: string;
  title: string;
  thumbnails: string;
  year: string;
  description?: string;
  albumId: string;
  artist: ArtistInterface;
}

export interface AlbumInterfaceWithSongs {
  id: string;
  title: string;
  thumbnails: string;
  year: string;
  description?: string;
  albumId: string;
  songs: SongInterface[];
  artist: ArtistInterface;
}

export interface AlbumInterfaceWithArtist {
  id: string;
  title: string;
  thumbnails: string;
  year: string;
  description?: string;
  albumId: string;
  songs: SongInterface[];
  artist: ArtistInterface;
}

export interface AlbumInfo {
  id: string;
  title: string;
  thumbnails: string;
  year: string;
  description?: string;
  albumId: string;
  songs: SongInterface[];
}
