export interface BaseUserInterface {
  id: string;

  pseudo: string;

  email: string;

  dateOfBirth: string;

  password: string;
}

export type UserType = BaseUserInterface;

export type UserLogin = Pick<BaseUserInterface, 'email' | 'password'>;

export type CreateUser = Omit<BaseUserInterface, 'id'>;

export type UpdateEmail = Pick<BaseUserInterface, 'email'>;

export type UpdatePassword = Pick<BaseUserInterface, 'password'>;
