import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlaylistService } from '../service/playlist.service';
import { PlaylistCreate, PlaylistPatch } from '../dto/base.dto';
import { Playlist } from 'src/entities/playlist/entity';

@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post(':userId')
  createPlaylist(
    @Body() data: PlaylistCreate,
    @Param('userId') userId: string,
  ): Promise<Playlist> {
    return this.playlistService.createPlaylist(data, userId);
  }

  @Get(':playlistId')
  getPlaylistById(@Param('playlistId') playlistId: string): Promise<Playlist> {
    return this.playlistService.getPlaylistById(playlistId);
  }

  @Get('/name/:name')
  getPlaylistByName(@Param('name') name: string): Promise<Playlist> {
    return this.playlistService.getPlaylistByName(name);
  }

  @Get('/user/:userId')
  getPlaylistByUserId(@Param('userId') userId: string): Promise<Playlist[]> {
    return this.playlistService.getPlaylistByUserId(userId);
  }

  @Patch(':playlistId')
  patchPlaylistById(
    @Body() data: PlaylistPatch,
    @Param('playlistId') playlistId: string,
  ): Promise<number> {
    return this.playlistService.patchPlaylistById(playlistId, data);
  }

  @Delete(':playlistId')
  deletePlaylistById(@Param('playlistId') playlistId: string): void {
    return this.playlistService.deletePlaylistById(playlistId);
  }
}
