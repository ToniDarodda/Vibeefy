import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/entity';
import { Repository } from 'typeorm';
import { UserCreate, UserLogin, UserPatch } from '../dto/base.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: UserCreate): Promise<User> {
    return this.userRepository.save(
      this.userRepository.create({
        ...data,
      }),
    );
  }

  async loginUser({ email, password }: UserLogin): Promise<User> {
    const retrievedUser = await this.userRepository.findOneBy({ email });

    const isPasswordCorrect = await retrievedUser.checkPassword(password);

    if (isPasswordCorrect) {
      return retrievedUser;
    }

    return null;
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
