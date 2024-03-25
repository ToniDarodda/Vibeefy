import { useQuery } from '@tanstack/react-query';

import { songService } from '../services/song';

const QueryKeyGetSong = 'GET_SONG_KEY';
const QueryKeyGetSongByName = 'GET_SONG_BY_NAME_KEY';
const QueryKeyGetSongsInfoByIds = 'GET_SONGS_INFO_BY_IDS_KEY';

export function useGetSong(songId: string) {
  return useQuery({
    queryKey: [QueryKeyGetSong, songId],
    queryFn: () => songService.getPlaylist(songId),
    enabled: !!songId,
  });
}

export const useGetSongsInfoByIds = (songIds: string[]) => {
  return useQuery({
    queryKey: [QueryKeyGetSongsInfoByIds, songIds],
    queryFn: () => songService.getSongsInfoByIds(songIds),
    enabled: songIds.length > 0 && songIds !== undefined,
  });
};

export const useGetSongByName = (songName: string) => {
  return useQuery({
    queryKey: [QueryKeyGetSongByName, songName],
    queryFn: () => songService.getSongsByName(songName),
    enabled: songName !== undefined && songName.length > 0,
  });
};
