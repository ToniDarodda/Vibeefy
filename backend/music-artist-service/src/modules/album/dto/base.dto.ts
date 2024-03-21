import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class AlbumBaseDTO {
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
    description: 'Name of album',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    example: 'https://google/image',
    description: 'Album image',
  })
  @IsNotEmpty()
  @IsString()
  albumPitcure: string;

  @ApiProperty({
    example: 'French rapper',
    description: 'Description of the artist',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'French rapper',
    description: 'Description of the artist',
  })
  @IsNumber()
  take?: number;

  @ApiProperty({
    example: 'French rapper',
    description: 'Description of the artist',
  })
  @IsNumber()
  skip?: number;

  @ApiProperty({
    example: '04-04-2024',
    description: 'Release date of the album',
  })
  @IsNotEmpty()
  @IsDate()
  releaseDate: Date;
}

export class AlbumGetById extends PickType(AlbumBaseDTO, ['id']) {}

export class AlbumGetBySongId extends PickType(AlbumBaseDTO, ['id']) {}

export class AlbumGetByName extends PickType(AlbumBaseDTO, [
  'name',
  'take',
  'skip',
]) {}
