import { useQuery } from '@tanstack/react-query';
import { artistService } from '../services/artist';

const QueryKeyGetArtistInfo = 'GET_ARTIST_INFO_KEY';
const QueryKeyGetArtistByName = 'GET_ARTIST_BY_NAME_KEY';

export const useGetArtistInfo = (artistId: string) => {
  return useQuery({
    queryKey: [QueryKeyGetArtistInfo, artistId],
    queryFn: () => artistService.getArtistInfo(artistId),
    enabled: artistId.length > 0,
  });
};

export const useGetArtistName = (artistName: string) => {
  return useQuery({
    queryKey: [QueryKeyGetArtistByName, artistName],
    queryFn: () => artistService.getArtistByName(artistName),
    enabled: artistName !== undefined && artistName.length > 0,
  });
};
