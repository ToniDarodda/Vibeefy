export interface PlaylistSong {
  id: string;
  songId: string;
  songName: string;
  songDuration: number;
}

export interface BasePlaylistInterface {
  id: string;

  name: string;

  isPublic?: boolean;

  songId: string[];

  sharedToUser: string;

  playlistSongs: PlaylistSong[];
}

export type PlaylistType = BasePlaylistInterface;

export type CreatePlaylist = Pick<BasePlaylistInterface, 'name' | 'isPublic'>;

export type AddSongToPlaylist = Pick<BasePlaylistInterface, 'id' | 'songId'>;

export type CreateSharedPlaylist = Pick<
  BasePlaylistInterface,
  'id' | 'sharedToUser'
>;

export type UpdatePlaylistName = Pick<BasePlaylistInterface, 'id' | 'name'>;

export type UpdateScopePlaylist = Pick<BasePlaylistInterface, 'isPublic'>;

export type DeletePlaylist = Pick<BasePlaylistInterface, 'id'>;
