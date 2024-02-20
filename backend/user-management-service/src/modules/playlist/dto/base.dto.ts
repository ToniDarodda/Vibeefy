import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class BasePlaylistDto {
  @ApiProperty({
    example: 'cb638b04-44cc-432e-bfb5-7a971edcdb96',
    description: 'User id',
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

export class PlaylistCreate extends OmitType(BasePlaylistDto, ['id']) {}

export class PlaylistGetById extends PickType(BasePlaylistDto, ['id']) {}

export class PlaylistGetByName extends PickType(BasePlaylistDto, ['name']) {}

export class PlaylistPatch extends OmitType(BasePlaylistDto, ['id']) {}

export class PlaylistDelete extends PickType(BasePlaylistDto, ['id']) {}
