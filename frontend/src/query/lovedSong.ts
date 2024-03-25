import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { lovedSongService } from '../services/lovedSong';

const CreateLovedSong = 'CREATE_LOVED_SONG';
const GetAllLovedSong = 'GET_ALL_LOVED_SONG';
const DeleteLovedSong = 'DELETE_LOVED_SONG';

export const useCreateLovedSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [CreateLovedSong],
    mutationFn: (params: { songId: string; isPublic: boolean }) =>
      lovedSongService.createLoveSong(params.songId, params.isPublic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GetAllLovedSong] });
    },
  });
};

export const useGetLovedSong = () => {
  return useQuery({
    queryKey: [GetAllLovedSong],
    queryFn: lovedSongService.getAllLovedSong,
  });
};

export const useDeleteLovedSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DeleteLovedSong],
    mutationFn: lovedSongService.deleteLovedSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GetAllLovedSong] });
    },
  });
};
