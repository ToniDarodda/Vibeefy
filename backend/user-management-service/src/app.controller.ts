import { Controller, Get, Param } from '@nestjs/common';
import { ArtistService } from './app.service';

@Controller()
export class UserController {
  constructor(private readonly userService: ArtistService) {}

  @Get('artist-info/:artistId')
  async getArtistInfo(@Param('artistId') artistId: string) {
    return this.userService.getArtistInfo(artistId);
  }
  @Get('album-info/:albumId')
  async getAlbumInfo(@Param('albumId') artistId: string) {
    return this.userService.getAlbumInfo(artistId);
  }
  @Get('album-name-info/:name')
  async getAlbumByName(@Param('name') name: string) {
    return this.userService.getAlbumByNameInfo(name);
  }
  @Get('songs-info/:albumId')
  async getSongsInfo(@Param('albumId') artistId: string) {
    return this.userService.getAlbumInfo(artistId);
  }
}
