import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Common } from '../common/entity';
import { Album } from '../album/entity';
import { Song } from '../song/entity';

@Entity()
export class Artist extends Common {
  @Column('varchar', { length: 255, unique: true })
  name: string;

  @Column('varchar', { name: 'thumbnails', nullable: true })
  thumbnails: string;

  @Column('varchar', { name: 'description', nullable: true })
  description?: string;

  @Column('varchar', { name: 'profile_picture', nullable: true })
  profilePicture?: string;

  @Column('varchar', { name: 'artist_youtube_id', nullable: true })
  artistYoutubeId: string;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @ManyToMany(() => Song, (song) => song.featuredArtists)
  collaboration: Song[];
}
