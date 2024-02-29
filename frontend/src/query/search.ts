import { useQuery } from '@tanstack/react-query';
import { searchService } from '../services/search';
import { Search } from '../interfaces/search';

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
