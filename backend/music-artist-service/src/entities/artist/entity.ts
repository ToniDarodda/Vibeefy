import { Column, Entity, OneToMany } from 'typeorm';
import { Common } from '../common/entity';
import { Album } from '../album/entity';

@Entity()
export class Artist extends Common {
  @Column('varchar', { name: 'pseudo', length: 100, unique: true })
  pseudo: string;

  @Column('varchar', { name: 'profile_picture' })
  profilePicture: string;

  @Column('varchar', { name: 'description' })
  description: string;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
