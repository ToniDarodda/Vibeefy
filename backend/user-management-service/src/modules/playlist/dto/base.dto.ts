import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

class BasePlaylistDto {
  @ApiProperty({
    example: 'cb638b04-44cc-432e-bfb5-7a971edcdb96',
    description: 'Playlist id',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    example: 'The playlist de merde',
    description: 'Name of the playlist',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'true',
    description: 'Is the playlist public',
  })
  @IsOptional()
  isPublic?: string;
}

class BasePLaylistSongDTO {
  @ApiProperty({
    example: 'cb638b04-44cc-432e-bfb5-7a971edcdb96',
    description: 'Playlist song id',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    example: 'cb638b04-44cc-432e-bfb5-7a971edcdb96',
    description: 'Song id',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  songId: string;
}

export class PlaylistSongCreate extends OmitType(BasePLaylistSongDTO, ['id']) {}

export class PlaylistSongDelete extends PickType(BasePLaylistSongDTO, [
  'songId',
]) {}

export class PlaylistCreate extends OmitType(BasePlaylistDto, ['id']) {}

export class PlaylistGetById extends PickType(BasePlaylistDto, ['id']) {}

export class PlaylistGetByName extends PickType(BasePlaylistDto, ['name']) {}

export class PlaylistPatch extends OmitType(BasePlaylistDto, ['id']) {}

export class PlaylistDelete extends PickType(BasePlaylistDto, ['id']) {}
