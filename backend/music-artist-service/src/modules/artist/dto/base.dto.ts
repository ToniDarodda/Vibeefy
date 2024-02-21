import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

import { ApiProperty, PickType } from '@nestjs/swagger';

export class ArtistBaseDTO {
  @ApiProperty({
    example: 'cb638b04-44cc-432e-bfb5-7a971edcdb96',
    description: 'Artist id',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    example: 'Kerchak',
    description: 'Pseudo of the Artist',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  pseudo: string;

  @ApiProperty({
    example: 'https://google.com/kerchak',
    description: 'Profile pitcture of the Artist',
  })
  @IsNotEmpty()
  @IsString()
  profilePicture: string;
}

export class ArtistGetById extends PickType(ArtistBaseDTO, ['id']) {}

export class ArtistGetByPseudo extends PickType(ArtistBaseDTO, ['pseudo']) {}
