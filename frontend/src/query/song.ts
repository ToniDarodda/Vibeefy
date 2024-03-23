import { useQuery } from '@tanstack/react-query';
import { songService } from '../services/song';

const QueryKeyGetSong = 'GET_SONG_KEY';
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
