import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { Common } from '../common/entity';

@Entity()
export class LovedSongToSong extends Common {
  @Column('varchar', { name: 'song_id' })
  songId: string;

  @ManyToOne(() => LovedSong, (lovedSong) => lovedSong.lovedSongToSong)
  @JoinColumn({ name: 'loved_song_id' })
  lovedSong: Relation<LovedSong>;
}

@Entity()
export class LovedSong extends Common {
  @Column('boolean', { name: 'public', default: false })
  public?: boolean;

  @OneToMany('LovedSongToSong', (lsts: LovedSongToSong) => lsts.lovedSong)
  lovedSongToSong: LovedSongToSong;
}
