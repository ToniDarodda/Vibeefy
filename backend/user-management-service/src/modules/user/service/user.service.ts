import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user/entity';
import { UserCreate, UserLogin, UserPatch } from '../dto/base.dto';
import { createAccessToken } from 'src/utils/jwt.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: UserCreate): Promise<string> {
    const findUserIfAlreadyExist = await this.getUserByEmail(data.email);

    if (findUserIfAlreadyExist !== null)
      throw new UnprocessableEntityException('User mail already taken!');

    const user = await this.userRepository.save(
      this.userRepository.create({
        ...data,
      }),
    );

    const accessToken = createAccessToken(user.id);

    return accessToken;
  }

  async loginUser({ email, password }: UserLogin): Promise<string> {
    const retrievedUser = await this.userRepository.findOneBy({ email });

    if (retrievedUser === undefined || retrievedUser === null)
      throw new UnauthorizedException('Invalid credential');

    const isPasswordCorrect = await retrievedUser.checkPassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credential');
    }

    return createAccessToken(retrievedUser.id);
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOneBy({
      id,
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async patchUser(data: UserPatch, userId: string): Promise<number> {
    const patchedUser = await this.userRepository.update(userId, {
      ...data,
    });
    return patchedUser.affected;
  }

  async deleteUser(userId: string): Promise<void> {
    this.userRepository.softDelete(userId);
  }
}
