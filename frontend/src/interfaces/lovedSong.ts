interface BaseLovedSong {
  id: string;

  songId: string;

  public?: boolean;
}

export type CreateLovedSong = Omit<BaseLovedSong, 'id'>;

export type DeleteLovedSong = Pick<BaseLovedSong, 'id'>;
