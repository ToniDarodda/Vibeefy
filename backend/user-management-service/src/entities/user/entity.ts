import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { Common } from '../common/entity';
import { Playlist } from '../playlist/entity';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { LovedSong } from '../lovedSong/entity';

const SALT = ">mA3%?9[RoJH>09+HWuDLdb/6ay'JF*8";

@Entity()
export class User extends Common {
  @Column('varchar', { name: 'pseudo', length: 100 })
  pseudo: string;

  @Column('varchar', { name: 'email', length: 255, unique: true })
  email: string;

  @Column('varchar', { name: 'date_of_birth', nullable: false })
  dateOfBirth: string;

  @Column('varchar', { name: 'password', nullable: false })
  password: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlist: Playlist;

  @OneToMany(() => LovedSong, (lovedSong) => lovedSong.user)
  lovedSong: LovedSong;

  @BeforeInsert()
  @BeforeUpdate()
  async handlePassword(): Promise<void> {
    if (!this.password) return;
    this.password = User.hashPassword(SALT, this.password);
  }

  generateSalt(): string {
    return randomBytes(16).toString('hex');
  }

  static hashPassword(salt: string, password: string): string {
    return pbkdf2Sync(password, salt, 10, 10, 'sha512').toString('hex');
  }

  async checkPassword(password: string): Promise<boolean> {
    const pass = User.hashPassword(SALT, password);

    return pass === this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  transformEmail(): void {
    if (this.email) this.email = this.email.toLowerCase();
  }
}
