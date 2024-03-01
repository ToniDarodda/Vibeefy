export type SearchFilter =
  | 'songs'
  | 'videos'
  | 'albums'
  | 'artists'
  | 'playlists'
  | 'users'
  | 'community_playlists'
  | 'featured_playlists'
  | 'uploads';

export interface Search {
  query: string;

  filter: SearchFilter;
}

interface Artist {
  name: string;
  id: string;
}

interface FeaturedArtists {
  name: string;
  id: string;
}

interface Album {
  name: string;
  id: string;
}

export interface SearchResponse {
  title: string;
  id: string;
  artists: Artist;
  featured_artists: FeaturedArtists[];
  album: Album;
  link: string;
  duration_seconds: number;
  thumbnails: string;
}

export interface DownloadSong {
  link: string;
  download: boolean;
}

export interface DownloadSongResponse {
  stream_url: string;
}
