import { useQuery } from '@tanstack/react-query';

import { searchService } from '../services/search';
import { Search, DownloadSong } from '../interfaces/search';

const MutationKeyGetSearch = 'GET_SEARCH_KEY';

export const useGetSearch = (search: Search) => {
  return useQuery({
    queryKey: [MutationKeyGetSearch, search],
    queryFn: () =>
      search.query?.trim() ? searchService.SearchSongs(search) : {},
  });
};

export const useDownloadSong = (data: DownloadSong) => {
  return useQuery({
    queryKey: [MutationKeyGetSearch, data],
    queryFn: () => (data.link?.trim() ? searchService.DownloadSong(data) : {}),
  });
};
