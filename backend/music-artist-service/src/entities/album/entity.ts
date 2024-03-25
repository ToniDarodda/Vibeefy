import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Common } from '../common/entity';
import { Artist } from '../artist/entity';
import { Song } from '../song/entity';

@Entity()
export class Album extends Common {
  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('varchar', { name: 'thumbnails' })
  thumbnails: string;

  @Column('varchar', { name: 'description', nullable: true })
  description?: string;

  @Column('varchar', { name: 'release_date', nullable: true })
  year?: string;

  @Column('varchar', { name: 'album_youtube_id', unique: true })
  albumId: string;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];
}
