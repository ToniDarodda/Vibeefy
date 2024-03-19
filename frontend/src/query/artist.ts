import { useQuery } from '@tanstack/react-query';
import { artistService } from '../services/artist';

const QueryKeyGetArtistInfo = 'GET_ARTIST_INFO_KEY';

export const useGetArtistInfo = (artistId: string) => {
  return useQuery({
    queryKey: [QueryKeyGetArtistInfo, artistId],
    queryFn: () => artistService.getArtistInfo(artistId),
    enabled: artistId.length > 0,
  });
};
