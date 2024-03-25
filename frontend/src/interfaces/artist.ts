export interface AlbumInterface {
  id: string;
  title: string;
  thumbnails: string;
  year: string;
  description?: string;
  albumId: string;
  songs: SongInterface[];
  artist: ArtistInterface;
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

export interface ArtistInterface {
  id: string;
  name: string;
  thumbnails: string | null;
  description: string | null;
  profilePicture: string;
  artistYoutubeId: string;
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
