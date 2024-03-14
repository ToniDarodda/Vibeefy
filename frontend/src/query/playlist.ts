import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { playlistService } from '../services/playlist';

const MutationKeyCreatePlaylist = 'CREATE_PLAYLIST_KEY';
const MutationKeyDeletePlaylist = 'DELETE_PLAYLIST_KEY';
const MutationKeyAddSongToPlaylist = 'CREATE_ADD_SONG_TO_PLAYLIST_KEY';
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

export const useAddSongToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MutationKeyAddSongToPlaylist],
    mutationFn: ({
      name,
      songId,
      playlistId,
      songDuration,
    }: {
      name: string;
      songId: string;
      playlistId: string;
      songDuration: number;
    }) =>
      playlistService.addSongToPlaylist(name, songId, playlistId, songDuration),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MutationKeyGetPlaylist] });
    },
  });
};

export const useDeletePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MutationKeyDeletePlaylist],
    mutationFn: playlistService.deletePlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MutationKeyGetPlaylist] });
    },
  });
};
