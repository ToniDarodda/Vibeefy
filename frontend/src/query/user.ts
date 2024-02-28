import { useMutation } from '@tanstack/react-query';
import { CreateUser } from '../interfaces/user';
import { userService } from '../services/user';

const MutationKeyCreateUser = 'CREATE_USER_KEY';

export const useCreateUser = () => {
  return useMutation({
    mutationKey: [MutationKeyCreateUser],
    mutationFn: (params: { data: CreateUser }) =>
      userService.UserCreate(params.data),
    onError: (err) => {
      console.log(err);
    },
  });
};
