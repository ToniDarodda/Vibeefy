import { useQuery, useQueries } from '@tanstack/react-query';
import { albumService } from '../services/album';

const MutationKeyGetAlbum = 'GET_ALBUMS_KEY';
const MutationKeyGetAlbumById = 'GET_ALBUM_BY_ID_KEY';
const MutationKeyGetAlbumBySongId = 'GET_ALBUM_BY_SONG_ID_KEY';

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

export const useGetAlbumById = (albumId: string) => {
  return useQuery({
    queryKey: [MutationKeyGetAlbumById, albumId],
    queryFn: () => albumService.getAlbumById(albumId),
    enabled: albumId !== undefined && albumId.length > 0,
  });
};

export const useGetAlbumBySongId = (firstSongIds: string[]) =>
  useQueries({
    queries: firstSongIds.map((songId) => {
      return {
        queryKey: [MutationKeyGetAlbumBySongId, songId],
        queryFn: () => albumService.getAlbumBySongId(songId),
        enabled: songId !== undefined && songId.length > 0,
      };
    }),
  });
