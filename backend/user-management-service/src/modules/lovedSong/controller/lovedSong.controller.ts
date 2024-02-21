import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LovedSongService } from '../service/lovedSong.service';
import { LovedSongCreate } from '../dto/base.dto';
import { LovedSong } from 'src/entities/lovedSong/entity';
import { AuthToken } from 'src/decorators/auth.decorator';
import { DecodedUserToken } from 'src/utils/jwt.util';

@ApiTags('LovedSong')
@Controller('love-song')
export class LovedSongController {
  constructor(private readonly lovedSongService: LovedSongService) {}

  @Post(':songId/user')
  @UseInterceptors(ClassSerializerInterceptor)
  createLovedSong(
    @Body() data: LovedSongCreate,
    @AuthToken() { userId }: DecodedUserToken,
    @Param('songId') songId: string,
  ): Promise<LovedSong> {
    return this.lovedSongService.createLovedSong(data, songId, userId);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getLovedSong(
    @AuthToken() { userId }: DecodedUserToken,
  ): Promise<LovedSong[]> {
    return this.lovedSongService.getLovedSong(userId);
  }

  @Delete(':songId')
  deleteLovedSong(@Param('songId') songId: string): void {
    return this.lovedSongService.deleteLovedSong(songId);
  }
}
