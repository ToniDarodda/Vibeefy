import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryFailedError } from 'typeorm';

import { LovedSong } from 'src/entities/lovedSong/entity';
import { AuthToken } from 'src/decorators/auth.decorator';
import { DecodedUserToken } from 'src/utils/jwt.util';
import { LovedSongService } from '../service/lovedSong.service';
import { LovedSongCreate } from '../dto/base.dto';

@ApiTags('LovedSong')
@Controller('love-song')
export class LovedSongController {
  constructor(private readonly lovedSongService: LovedSongService) {}

  @Post(':songId/user')
  @UseInterceptors(ClassSerializerInterceptor)
  async createLovedSong(
    @Body() data: LovedSongCreate,
    @AuthToken() { userId }: DecodedUserToken,
    @Param('songId') songId: string,
  ): Promise<LovedSong> {
    try {
      return await this.lovedSongService.createLovedSong(data, songId, userId);
    } catch (err) {
      if (err instanceof QueryFailedError)
        throw new HttpException(
          'Invalid input for songId',
          HttpStatus.BAD_REQUEST,
        );
      else throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getLovedSong(
    @AuthToken() { userId }: DecodedUserToken,
  ): Promise<LovedSong[]> {
    return this.lovedSongService.getLovedSong(userId);
  }

  @Delete(':songId')
  async deleteLovedSong(@Param('songId') songId: string): Promise<void> {
    try {
      return await this.lovedSongService.deleteLovedSong(songId);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new HttpException(
          'Invalid input for songId',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
