import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Playlist, PlaylistSong } from 'src/entities/playlist/entity';
import {
  PlaylistCreate,
  PlaylistSongCreate,
  PlaylistPatch,
} from '../dto/base.dto';
import { PlaylistService } from '../service/playlist.service';
import { QueryFailedError } from 'typeorm';
import { AuthToken } from 'src/decorators/auth.decorator';
import { DecodedUserToken } from 'src/utils/jwt.util';

@ApiTags('Playlist')
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  createPlaylistForUser(
    @Body() playlistData: PlaylistCreate,
    @AuthToken() { userId }: DecodedUserToken,
  ): Promise<Playlist> {
    return this.playlistService.createPlaylist(playlistData, userId);
  }

  @Post(':playlistId/songs')
  addSongToPlaylist(
    @Param('playlistId') playlistId: string,
    @Body() songData: PlaylistSongCreate,
  ): Promise<PlaylistSong> {
    return this.playlistService.addSongToPlaylist(playlistId, songData);
  }

  @Post(':playlistId/album/:albumId')
  async addAlbumToPlaylist(
    @Param('playlistId') playlistId: string,
    @Param('albumId') albumId: string,
  ): Promise<PlaylistSong[]> {
    try {
      return await this.playlistService.addAlbumToPlaylist(albumId, playlistId);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new HttpException(
          'Invalid input for albumId or playlistId',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get(':playlistId')
  getPlaylistById(@Param('playlistId') playlistId: string): Promise<Playlist> {
    return this.playlistService.getPlaylistById(playlistId);
  }

  @Get('by-name/:name')
  findPlaylistsByName(@Param('name') name: string): Promise<Playlist> {
    return this.playlistService.getPlaylistByName(name);
  }

  @Get('by-user')
  findPlaylistsByUserId(
    @AuthToken() { userId }: DecodedUserToken,
  ): Promise<Playlist[]> {
    return this.playlistService.getPlaylistByUserId(userId);
  }

  @Patch(':playlistId')
  updatePlaylistById(
    @Param('playlistId') playlistId: string,
    @Body() updateData: PlaylistPatch,
  ): Promise<number> {
    return this.playlistService.patchPlaylistById(playlistId, updateData);
  }

  @Delete(':playlistId')
  removePlaylistById(@Param('playlistId') playlistId: string): void {
    this.playlistService.deletePlaylistById(playlistId);
  }

  @Delete(':playlistId/songs/:songId')
  removeSongFromPlaylist(
    @Param('playlistId') playlistId: string,
    @Param('songId') songId: string,
  ): void {
    this.playlistService.deleteSongFromPlaylist(playlistId, songId);
  }
}
