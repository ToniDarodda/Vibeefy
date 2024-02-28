import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { playlistService } from '../services/playlist';

const MutationKeyCreatePlaylist = 'CREATE_PLAYLIST_KEY';
const MutationKeyGetPlaylist = 'GET_PLAYLIST_KEY';

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MutationKeyCreatePlaylist],
    mutationFn: playlistService.createPlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MutationKeyGetPlaylist] });
    },
  });
};

export const useGetPlaylist = () => {
  return useQuery({
    queryKey: [MutationKeyGetPlaylist],
    queryFn: playlistService.getPlaylist,
  });
};
