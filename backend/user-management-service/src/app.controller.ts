// user.controller.ts dans user-management-service
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './app.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('artist-info/:artistId')
  async getArtistInfo(@Param('artistId') artistId: number) {
    return this.userService.getArtistInfo(artistId);
  }
}
