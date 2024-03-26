import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistManagerService } from '../service/artist-manager.service';

@Controller()
export class ArtistManagerController {
  constructor(private readonly userService: ArtistManagerService) {}

  @Get('artist-info/:artistId')
  @UseInterceptors(ClassSerializerInterceptor)
  async getArtistInfo(@Param('artistId') artistId: string) {
    return this.userService.getArtistInfo(artistId);
  }

  @Get('artist-info')
  async getArtist(@Query('take') take: string, @Query('skip') skip: string) {
    return this.userService.getArtist(+take, +skip);
  }

  @Get('artist-info/name/:name')
  async getArtistByPseudo(@Param('name') name: string) {
    return this.userService.getArtistByPseudo(name);
  }

  @Get('album-info/song/:songId')
  async getAlbumInfoBySongId(@Param('songId') songId: string) {
    return this.userService.getAlbumInfoBySongId(songId);
  }

  @Get('album-info/:albumId')
  async getAlbumInfo(@Param('albumId') albumId: string) {
    return this.userService.getAlbumInfo(albumId);
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

  @Get('songs/info')
  async getSongsInfoById(@Query('songId') songIds: string[]) {
    const ids = songIds instanceof Array ? songIds : [songIds];

    return this.userService.getSongsInfoByIds(ids);
  }

  @Get('songs/name/')
  async getSongsByName(
    @Query('name') name: string,
    @Query('take') take: string,
    @Query('skip') skip: string,
  ) {
    return this.userService.getSongsByName(name, +take, +skip);
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
