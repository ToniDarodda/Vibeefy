import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class SondBaseDTO {
  @ApiProperty({
    example: 'cb638b04-44cc-432e-bfb5-7a971edcdb96',
    description: 'Artist id',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    example: 'Saison 2',
    description: 'Song name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 20,
    description: 'Number sent back',
  })
  @IsNumber()
  take?: number;

  @ApiProperty({
    example: 2,
    description: 'Number skipped',
  })
  @IsNumber()
  skip?: number;

  @ApiProperty({
    example: '2,42',
    description: 'Song duration',
  })
  @IsNotEmpty()
  @IsNumber()
  songDuration: number;
}

export class SongsGetByIdsDTO {
  @ApiProperty({
    example: [
      'cb638b04-44cc-432e-bfb5-7a971edcdb96',
      'ae638b04-44cc-432e-bfb5-7a971edcdb98',
    ],
    description: 'List of song ids',
    isArray: true,
  })
  @IsUUID('4', { each: true })
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  ids: string[];
}

export class SongGetById extends PickType(SondBaseDTO, ['id']) {}

export class SongGetByName extends PickType(SondBaseDTO, [
  'name',
  'take',
  'skip',
]) {}

export class SongGetByAlbumId extends PickType(SondBaseDTO, ['id']) {}
