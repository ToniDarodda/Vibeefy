import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserCreate, UserPatch } from '../dto/base.dto';
import { User } from 'src/entities/user/entity';
import { UserService } from '../service/user.service';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() data: UserCreate): Promise<User> {
    return this.userService.createUser(data);
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUser(userId);
  }

  @Get('mail/:userMail')
  getUserByMail(@Param('userMail') userMail: string): Promise<User> {
    return this.userService.getUserByEmail(userMail);
  }

  @Patch(':userId')
  PatchUserByMail(
    @Param('userId') userId: string,
    @Body() data: UserPatch,
  ): Promise<number> {
    return this.userService.patchUser(data, userId);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
