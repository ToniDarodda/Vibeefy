import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Common } from '../common/entity';
import { Album } from '../album/entity';
import { Artist } from '../artist/entity';

@Entity()
export class Song extends Common {
  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('int', { name: 'song_duration' })
  songDuration: number;

  @Column('varchar')
  thumbnails: string;

  @Column('varchar', { name: 'video_youtube_id' })
  videoId: string;

  @ManyToMany(() => Artist, (artist) => artist.collaboration)
  featuredArtists: Artist[];

  @ManyToOne(() => Album, (album) => album.songs)
  album: Album;
}
