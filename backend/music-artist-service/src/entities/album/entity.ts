import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Common } from '../common/entity';
import { Artist } from '../artist/entity';
import { Song } from '../song/entity';

@Entity()
export class Album extends Common {
  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('varchar', { name: 'album_picture' })
  albumPicture: string;

  @Column('varchar', { name: 'description' })
  description: string;

  @Column('date', { name: 'release_date' })
  releaseData: Date;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist;

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];
}
