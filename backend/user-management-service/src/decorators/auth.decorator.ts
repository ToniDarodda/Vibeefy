import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedUserToken, decodeToken } from 'src/utils/jwt.util';

export const AuthToken = createParamDecorator(
  (_data: string, ctx: ExecutionContext): DecodedUserToken => {
    const { COOKIE_TOKEN_NAME } = process.env;
    const { cookies } = ctx.switchToHttp().getRequest();

    return decodeToken(cookies[COOKIE_TOKEN_NAME]);
  },
);
