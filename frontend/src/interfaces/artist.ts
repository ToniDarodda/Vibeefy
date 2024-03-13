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

interface ArtistInterface {
  id: string;
  name: string;
  thumbnails: string | null;
  description: string | null;
  profilePicture: string;
  artistYoutubeId: string;
}
