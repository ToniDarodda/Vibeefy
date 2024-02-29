import { FetchScrawler } from '../utils/axios';
import { Search, SearchResponse } from '../interfaces/search';

class SearchService {
  async SearchSongs(search: Search): Promise<SearchResponse[]> {
    try {
      return (
        await FetchScrawler.get<SearchResponse[]>(
          `/search?query=${search.query}&filter=${search.filter}`,
        )
      ).data;
    } catch (err) {
      throw err;
    }
  }
}

export const searchService: SearchService = new SearchService();
