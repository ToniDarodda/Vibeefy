import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  Relation,
  JoinColumn,
} from 'typeorm';
import { Common } from '../common/entity';
import { User } from '../user/entity';

@Entity()
export class PlaylistSong extends Common {
  @Column('varchar', { name: 'song_id' })
  songId: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.playlistSongs)
  @JoinColumn({ name: 'playlist_id' })
  playlist: Relation<Playlist>;
}

@Entity()
export class Playlist extends Common {
  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('boolean', { name: 'public', default: false })
  public?: boolean;

  @OneToMany(
    'PlaylistSong',
    (playlistSong: PlaylistSong) => playlistSong.playlist,
  )
  playlistSongs: PlaylistSong[];

  @ManyToMany(() => User)
  sharedToUser: User;

  @ManyToOne(() => User, (user) => user.playlist)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
