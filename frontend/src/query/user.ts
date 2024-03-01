import { useMutation } from '@tanstack/react-query';

import { CreateUser, UserLogin } from '../interfaces/user';
import { userService } from '../services/user';

const MutationKeyCreateUser = 'CREATE_USER_KEY';
const MutationKeyLoginUser = 'CREATE_LOGIN_KEY';

export const useCreateUser = () => {
  return useMutation({
    mutationKey: [MutationKeyCreateUser],
    mutationFn: (params: { data: CreateUser }) =>
      userService.UserCreate(params.data),
    onError: (err) => err,
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationKey: [MutationKeyLoginUser],
    mutationFn: (params: { data: UserLogin }) =>
      userService.UserLogin(params.data),
    onError: (err) => err,
  });
};
