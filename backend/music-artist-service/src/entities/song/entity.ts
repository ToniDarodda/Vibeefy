import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Common } from '../common/entity';
import { Album } from '../album/entity';
import { Artist } from '../artist/entity';

@Entity()
export class Song extends Common {
  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('int', { name: 'song_duration' })
  songDuration: number;

  @Column('int', { name: 'track_number', nullable: true })
  trackNumber: number;

  @Column('varchar')
  thumbnails: string;

  @Column('varchar', { name: 'video_youtube_id', unique: true })
  videoId: string;

  @ManyToMany(() => Artist, (artist) => artist.collaboration)
  featuredArtists: Artist[];

  @ManyToOne(() => Album, (album) => album.songs)
  @JoinColumn({ name: 'album_id' })
  album: Album;
}
