import { useQuery } from '@tanstack/react-query';
import { albumService } from '../services/album';

const MutationKeyGetAlbum = 'GET_ALBUMS_KEY';

export const useGetAlbum = (name: string, take?: number, skip?: number) => {
  return useQuery({
    queryKey: [MutationKeyGetAlbum, name, take, skip],
    queryFn: async ({ queryKey }) => {
      const [, name, take, skip] = queryKey;
      return albumService.getAlbumByName(
        name as string,
        take as number,
        skip as number,
      );
    },
    staleTime: 5 * 60 * 1000, // Les données restent fraîches pendant 5 minutes
  });
};
