import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  Relation,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Common } from '../common/entity';
import { User } from '../user/entity';

@Entity()
export class PlaylistSong extends Common {
  @Column('varchar', { name: 'song_id' })
  songId: string;

  @Column('varchar', { name: 'name', nullable: true })
  songName: string;

  @Column('int', { name: 'song_duration', nullable: true })
  songDuration: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.playlistSongs)
  @JoinColumn({ name: 'playlist_id' })
  playlist: Relation<Playlist>;
}

@Entity()
export class Playlist extends Common {
  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('boolean', { name: 'public', default: false })
  isPublic?: boolean;

  @Column('varchar', { name: 'share_code', nullable: true, unique: true })
  shareCode?: string;

  @OneToMany(
    'PlaylistSong',
    (playlistSong: PlaylistSong) => playlistSong.playlist,
  )
  playlistSongs: PlaylistSong[];

  @ManyToMany(() => User)
  @JoinTable()
  sharedToUser: User[];

  @ManyToOne(() => User, (user) => user.playlist)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
