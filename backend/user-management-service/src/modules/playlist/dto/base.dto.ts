import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

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
  isPublic: boolean;
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

  @ApiProperty({
    example: 'Go',
    description: 'Song id',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '166',
    description: 'Song id',
  })
  @IsNumber()
  songDuration: number;
}

export class PlaylistCode {
  @ApiProperty({
    example: 'Xdwqr241',
    description: 'code',
  })
  @IsString()
  code: string;
}

export class PlaylistSongCreate extends OmitType(BasePLaylistSongDTO, ['id']) {}

export class PlaylistSongDelete extends PickType(BasePLaylistSongDTO, [
  'songId',
]) {}

export class PlaylistCreate extends OmitType(BasePlaylistDto, ['id']) {}

export class PlaylistShare extends PickType(BasePlaylistDto, ['id']) {}

export class PlaylistPublic extends PickType(BasePlaylistDto, ['id']) {}

export class PlaylistGetById extends PickType(BasePlaylistDto, ['id']) {}

export class PlaylistGetByName extends PickType(BasePlaylistDto, ['name']) {}

export class PlaylistPatch extends OmitType(BasePlaylistDto, ['id']) {}

export class PlaylistDelete extends PickType(BasePlaylistDto, ['id']) {}
