import { useQuery } from '@tanstack/react-query';
import { searchService } from '../services/search';
import { Search, DownloadSong } from '../interfaces/search';

const MutationKeyGetSearch = 'GET_SEARCH_KEY';

export const useGetSearch = (search: Search) => {
  return useQuery({
    queryKey: [MutationKeyGetSearch, search],
    queryFn: () => {
      if (!search.query || search.query === '') return {};
      return searchService.SearchSongs(search);
    },
  });
};

export const useDownloadSong = (data: DownloadSong) => {
  return useQuery({
    queryKey: [MutationKeyGetSearch, data],
    queryFn: () => {
      if (!data.link || data.link === '') return {};
      return searchService.DownloadSong(data);
    },
  });
};
