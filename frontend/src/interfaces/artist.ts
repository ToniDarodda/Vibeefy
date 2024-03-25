import { AlbumInfo } from './album';

export interface Artist {
  name: string;
  id: string;
}

export interface FeaturedArtists {
  name: string;
  id: string;
}

export interface ArtistInterface {
  id: string;
  name: string;
  thumbnails: string | null;
  description: string | null;
  profilePicture: string;
  artistYoutubeId: string;
}

export interface ArtistInfo {
  id: string;
  name: string;
  thumbnails: string | null;
  description: string | null;
  profilePicture: string;
  artistYoutubeId: string;
  albums: AlbumInfo[];
}

export interface RawArtist {
  id: string;
  name: string;
  thumbnails: string;
  description: string;
  profilePicture: string;
  artistYoutubeId: string;
}
