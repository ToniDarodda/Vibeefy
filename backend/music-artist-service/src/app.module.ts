import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { SongModule } from './modules/song/song.module';

const modules = [ArtistModule, AlbumModule, SongModule];

@Module({
  imports: [TypeOrmModule.forRoot(config), ConfigModule.forRoot(), ...modules],
})
export class AppModule {}
