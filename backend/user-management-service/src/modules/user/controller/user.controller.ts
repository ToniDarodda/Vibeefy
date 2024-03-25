import { Response } from 'express';

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { DecodedUserToken } from 'src/utils/jwt.util';
import { AuthToken } from 'src/decorators/auth.decorator';
import { User } from 'src/entities/user/entity';
import { UserCreate, UserLogin, UserPatch } from '../dto/base.dto';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller('user')
@ApiUnauthorizedResponse({ description: 'Token malformed or invalid' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOkResponse({ description: 'Create user seccessfully' })
  @ApiUnprocessableEntityResponse({
    description: 'The entity is unprocessable',
  })
  async createUser(
    @Res({ passthrough: true }) res: Response,
    @Body() data: UserCreate,
  ): Promise<void> {
    const { ACCESS_TOKEN, COOKIE_TOKEN_NAME } = process.env;

    const accessToken = await this.userService.createUser(data);

    res.cookie(COOKIE_TOKEN_NAME, accessToken, {
      expires: new Date(Date.now() + parseInt(ACCESS_TOKEN, 10)),
      secure: true,
      sameSite: 'none',
    });
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
      secure: true,
      sameSite: 'none',
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get user by id' })
  @UseInterceptors(ClassSerializerInterceptor)
  getUserById(@AuthToken() { userId }: DecodedUserToken): Promise<User> {
    return this.userService.getUser(userId);
  }

  @Get(':userMail/mail')
  @ApiOperation({ summary: 'Get user by mail' })
  @UseInterceptors(ClassSerializerInterceptor)
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
