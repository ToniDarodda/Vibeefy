import { Column, Entity, ManyToOne } from 'typeorm';
import { Common } from '../common/entity';
import { Album } from '../album/entity';

@Entity()
export class Song extends Common {
  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('int', { name: 'song_duration' })
  songDuration: number;

  @ManyToOne(() => Album, (album) => album.songs)
  album: Album;
}
