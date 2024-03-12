import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArtistManagerService } from '../service/artist-manager.service';

@Controller()
export class ArtistManagerController {
  constructor(private readonly userService: ArtistManagerService) {}

  @Get('artist-info/:artistId')
  async getArtistInfo(@Param('artistId') artistId: string) {
    return this.userService.getArtistInfo(artistId);
  }
  @Get('artist-info')
  async getArtist(@Query('take') take: string, @Query('skip') skip: string) {
    return this.userService.getArtist(+take, +skip);
  }

  @Get('album-info/:albumId')
  async getAlbumInfo(@Param('albumId') artistId: string) {
    return this.userService.getAlbumInfo(artistId);
  }

  @Get('album-name-info/')
  async getAlbumByName(
    @Query('name') name: string,
    @Query('take') take: string,
    @Query('skip') skip: string,
  ) {
    const takeNumber = parseInt(take, 10) || 10;
    const skipNumber = parseInt(skip, 10) || 0;

    return this.userService.getAlbumByNameInfo(name, takeNumber, skipNumber);
  }

  @Get('songs/:songId')
  async getSongById(@Param('songId') songId: string) {
    return this.userService.getSongByIdInfo(songId);
  }

  @Get('songs-info/:albumId')
  async getSongsInfo(@Param('albumId') artistId: string) {
    return this.userService.getAlbumInfo(artistId);
  }
}