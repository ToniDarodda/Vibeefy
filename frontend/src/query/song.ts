import { useQuery } from '@tanstack/react-query';
import { songService } from '../services/song';

const QueryKeyGetSong = 'GET_SONG_KEY';

export function useGetSong(songId: string) {
  return useQuery({
    queryKey: [QueryKeyGetSong, songId],
    queryFn: () => songService.getPlaylist(songId),
    enabled: !!songId,
  });
}
