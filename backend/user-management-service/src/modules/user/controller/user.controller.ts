import { Response } from 'express';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UserCreate, UserLogin, UserPatch } from '../dto/base.dto';
import { User } from 'src/entities/user/entity';
import { UserService } from '../service/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthToken } from 'src/decorators/auth.decorator';
import { DecodedUserToken } from 'src/utils/jwt.util';
import { QueryFailedError } from 'typeorm';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create user' })
  async createUser(
    @Res({ passthrough: true }) res: Response,
    @Body() data: UserCreate,
  ): Promise<void> {
    try {
      const { ACCESS_TOKEN, COOKIE_TOKEN_NAME } = process.env;

      const accessToken = await this.userService.createUser(data);

      res.cookie(COOKIE_TOKEN_NAME, accessToken, {
        expires: new Date(Date.now() + parseInt(ACCESS_TOKEN, 10)),
      });
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new HttpException('Email already taken!', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login to user account' })
  async loginUser(
    @Res({ passthrough: true }) res: Response,
    @Body() data: UserLogin,
  ): Promise<void> {
    const { ACCESS_TOKEN, COOKIE_TOKEN_NAME } = process.env;

    const accessToken = await this.userService.loginUser(data);

    res.cookie(COOKIE_TOKEN_NAME, accessToken, {
      expires: new Date(Date.now() + parseInt(ACCESS_TOKEN, 10)),
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get user by id' })
  getUserById(@AuthToken() { userId }: DecodedUserToken): Promise<User> {
    return this.userService.getUser(userId);
  }

  @Get(':userMail/mail')
  @ApiOperation({ summary: 'Get user by mail' })
  getUserByMail(@Param('userMail') userMail: string): Promise<User> {
    return this.userService.getUserByEmail(userMail);
  }

  @Patch()
  @ApiOperation({ summary: 'Patch user by userId' })
  PatchUserByMail(
    @AuthToken() { userId }: DecodedUserToken,
    @Body() data: UserPatch,
  ): Promise<number> {
    return this.userService.patchUser(data, userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete user by userId' })
  deleteUser(@AuthToken() { userId }: DecodedUserToken): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
