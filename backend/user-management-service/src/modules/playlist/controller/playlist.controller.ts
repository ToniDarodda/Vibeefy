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
@Controller('playlist')
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
  async addSongToPlaylist(
    @Param('playlistId') playlistId: string,
    @Body() songData: PlaylistSongCreate,
  ): Promise<PlaylistSong> {
    try {
      return await this.playlistService.addSongToPlaylist(playlistId, songData);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new HttpException(
          'Invalid input for albumId or playlistId',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
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
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get(':playlistId')
  async getPlaylistById(
    @Param('playlistId') playlistId: string,
  ): Promise<Playlist> {
    try {
      return await this.playlistService.getPlaylistById(playlistId);
    } catch (err) {
      if (err instanceof QueryFailedError)
        throw new HttpException(
          'Invalid input for playlistId',
          HttpStatus.BAD_REQUEST,
        );
      else throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('by-user/me')
  async findPlaylistsByUserId(
    @AuthToken() { userId }: DecodedUserToken,
  ): Promise<Playlist[]> {
    return await this.playlistService.getPlaylistByUserId(userId);
  }

  @Get('by-name/:name')
  findPlaylistsByName(@Param('name') name: string): Promise<Playlist> {
    return this.playlistService.getPlaylistByName(name);
  }

  @Patch(':playlistId')
  async updatePlaylistById(
    @Param('playlistId') playlistId: string,
    @Body() updateData: PlaylistPatch,
  ): Promise<number> {
    try {
      return await this.playlistService.patchPlaylistById(
        playlistId,
        updateData,
      );
    } catch (err) {
      if (err instanceof QueryFailedError)
        throw new HttpException(
          'Invalid input for playlistId',
          HttpStatus.BAD_REQUEST,
        );
      else throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':playlistId')
  async removePlaylistById(
    @Param('playlistId') playlistId: string,
  ): Promise<void> {
    try {
      await this.playlistService.deletePlaylistById(playlistId);
    } catch (err) {
      if (err instanceof QueryFailedError)
        throw new HttpException(
          'Invalid input for playlistId',
          HttpStatus.BAD_REQUEST,
        );
      else throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':playlistId/songs/:songId')
  async removeSongFromPlaylist(
    @Param('playlistId') playlistId: string,
    @Param('songId') songId: string,
  ): Promise<void> {
    try {
      await this.playlistService.deleteSongFromPlaylist(playlistId, songId);
    } catch (err) {
      if (err instanceof QueryFailedError)
        throw new HttpException(
          'Invalid input for playlistId or songId',
          HttpStatus.BAD_REQUEST,
        );
      else throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
