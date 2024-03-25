import * as jwt from 'jsonwebtoken';

import { UnauthorizedException } from '@nestjs/common';

export interface DecodedUserToken extends jwt.JwtPayload {
  userId: string;
}

export const createPassword = (): string =>
  Math.floor(100000 + Math.random() * 899999).toString();

export const createToken = (
  payload: string | Buffer | object,
  secretOrPrivateKey: string,
  options?: jwt.SignOptions,
): string => jwt.sign(payload, secretOrPrivateKey, options);

export const createAccessToken = (userId: string): string => {
  const { ACCESS_TOKEN, SECRET_KEY } = process.env;

  return createToken({ userId, type: 'access_token' }, SECRET_KEY, {
    expiresIn: ACCESS_TOKEN,
  });
};

export const createRefreshToken = (salt: string): string => {
  const { REFRESH_TOKEN, SECRET_KEY } = process.env;

  return createToken({ salt, type: 'refresh_token' }, SECRET_KEY, {
    expiresIn: REFRESH_TOKEN,
  });
};

export const createResetToken = (salt: string): string => {
  const { RESET_TOKEN, SECRET_KEY } = process.env;

  return createToken({ salt, type: 'reset_token' }, SECRET_KEY, {
    expiresIn: RESET_TOKEN,
  });
};

export const verifyToken = (token: string): void => {
  const { SECRET_KEY } = process.env;
  try {
    if (!token) throw new Error();
    jwt.verify(token, SECRET_KEY);
  } catch (err: unknown) {
    console.error(
      `[decodeUserToken] - Unable to decode userToken, cookie might be invalid`,
      err,
    );
    throw new UnauthorizedException('Invalid cookie');
  }
};

export const decodeToken = (token: string): DecodedUserToken => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded) throw new Error('Decode not worked');
    return decoded as DecodedUserToken;
  } catch (err) {
    console.error(
      `[decodeUserToken] - Unable to decode userToken, cookie might be invalid!`,
      err,
    );
    throw new UnauthorizedException('Invalid cookie');
  }
};

export const isValidToken = (token: string): boolean => {
  const { exp, iat, userId }: DecodedUserToken = decodeToken(token);

  const expirationTimestampInSeconds = Math.floor(Date.now() / 1000) + 60 * 60; // 60 seconds/minute * 60 minutes/hour

  if (!userId) return false;
  if (exp < expirationTimestampInSeconds) return false;
  if (iat > expirationTimestampInSeconds) return false;
  return true;
};

export const generateSharableCode = (): string =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const generateRecoverCode = (): string =>
  Math.floor(1000000 + Math.random() * 9000000).toString();
