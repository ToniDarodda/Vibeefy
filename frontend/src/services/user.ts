import { CreateUser } from '../interfaces/user';
import { Fetch } from '../utils/axios';

class UserService {
  async UserCreate(data: CreateUser): Promise<void> {
    try {
      await Fetch.post<void>(`/user/register`, data);
    } catch (err) {
      throw err;
    }
  }
}

export const userService: UserService = new UserService();
