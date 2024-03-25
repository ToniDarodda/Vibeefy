import { Repository } from 'typeorm';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/entities/user/entity';
import {
  verifyToken,
  isValidToken,
  DecodedUserToken,
  decodeToken,
} from 'src/utils/jwt.util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { cookies } = context.switchToHttp().getRequest();
    const { COOKIE_TOKEN_NAME, COOKIE_REFRESH_TOKEN_NAME } = process.env;

    verifyToken(cookies[COOKIE_TOKEN_NAME]);
    verifyToken(cookies[COOKIE_REFRESH_TOKEN_NAME]);

    const canPass = isValidToken(cookies[COOKIE_TOKEN_NAME]);

    if (!canPass) throw new UnauthorizedException(`Token provided is expired`);

    const { userId }: DecodedUserToken = decodeToken(
      cookies[COOKIE_TOKEN_NAME],
    );

    const foundUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!foundUser)
      throw new UnauthorizedException('Error while retrieving user');

    return true;
  }
}
