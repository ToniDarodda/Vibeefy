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
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Playlist, PlaylistSong } from 'src/entities/playlist/entity';
import {
  PlaylistCreate,
  PlaylistSongCreate,
  PlaylistPatch,
  PlaylistCode,
  PlaylistPublic,
} from '../dto/base.dto';
import { PlaylistService } from '../service/playlist.service';
import { QueryFailedError, UpdateResult } from 'typeorm';
import { AuthToken } from 'src/decorators/auth.decorator';
import { DecodedUserToken } from 'src/utils/jwt.util';

@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  createPlaylistForUser(
    @Body() playlistData: PlaylistCreate,
    @AuthToken() { userId }: DecodedUserToken,
  ): Promise<Playlist> {
    return this.playlistService.createPlaylist(playlistData, userId);
  }

  @Post('/generate-code')
  @UseInterceptors(ClassSerializerInterceptor)
  generateCodeForPlaylist(
    @Body() { id }: PlaylistPublic,
    @AuthToken() { userId }: DecodedUserToken,
  ): Promise<string> {
    return this.playlistService.generateSharablePlaylistCode(userId, id);
  }

  @Post('/use-code')
  @UseInterceptors(ClassSerializerInterceptor)
  useGeneratedPlaylistCode(
    @Body() { code }: PlaylistCode,
    @AuthToken() { userId }: DecodedUserToken,
  ): Promise<void> {
    return this.playlistService.useGeneratedPlaylistCode(code, userId);
  }
  @Post('/make-public')
  @UseInterceptors(ClassSerializerInterceptor)
  makePlaylistPublic(
    @Body() { id }: PlaylistPublic,
    @AuthToken() { userId }: DecodedUserToken,
  ): Promise<UpdateResult> {
    return this.playlistService.makePlaylistPublic(userId, id);
  }

  @Post(':playlistId/songs')
  @UseInterceptors(ClassSerializerInterceptor)
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
  @UseInterceptors(ClassSerializerInterceptor)
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

  @Get('/public')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllPublicPlaylist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @AuthToken() { userId }: DecodedUserToken,
  ): Promise<Playlist[]> {
    return await this.playlistService.getPublicPlaylist();
  }

  @Get('by-user/me')
  @UseInterceptors(ClassSerializerInterceptor)
  async findPlaylistsByUserId(
    @AuthToken() { userId }: DecodedUserToken,
  ): Promise<Playlist[]> {
    return await this.playlistService.getPlaylistByUserId(userId);
  }

  @Get('by-name/:name')
  @UseInterceptors(ClassSerializerInterceptor)
  findPlaylistsByName(@Param('name') name: string): Promise<Playlist> {
    return this.playlistService.getPlaylistByName(name);
  }

  @Get(':playlistId')
  @UseInterceptors(ClassSerializerInterceptor)
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
