import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

class BaseLovedSong {
  @ApiProperty({
    example: 'cb638b04-44cc-432e-bfb5-7a971edcdb96',
    description: 'LovedSong id',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    example: 'false',
    description: 'Song loved public',
  })
  @IsOptional()
  isPublic?: boolean;
}

export class LovedSongCreate extends PickType(BaseLovedSong, ['isPublic']) {}
