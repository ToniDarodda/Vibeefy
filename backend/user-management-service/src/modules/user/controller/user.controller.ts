import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserCreate, UserLogin, UserPatch } from '../dto/base.dto';
import { User } from 'src/entities/user/entity';
import { UserService } from '../service/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() data: UserCreate): Promise<User> {
    return this.userService.createUser(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login to user account' })
  loginUser(@Body() data: UserLogin): Promise<User> {
    return this.userService.loginUser(data);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user by id' })
  getUserById(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUser(userId);
  }

  @Get('mail/:userMail')
  @ApiOperation({ summary: 'Get user by mail' })
  getUserByMail(@Param('userMail') userMail: string): Promise<User> {
    return this.userService.getUserByEmail(userMail);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Patch user by userId' })
  PatchUserByMail(
    @Param('userId') userId: string,
    @Body() data: UserPatch,
  ): Promise<number> {
    return this.userService.patchUser(data, userId);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user by userId' })
  deleteUser(@Param('userId') userId: string): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
