import { VStack, HStack } from '@chakra-ui/react';

import { SearchBar } from '../searchBar';
import {
  AlbumInterface,
  SearchResponse,
  BasePlaylistInterface,
} from '../../../interfaces';
import { NoDataSearch } from './noDataSearch';
import { TopResultSearch } from './topResultSearch';
import { SongSearch } from './songSearch';
import { ArtistSearch } from './artistSearch';
import { AlbumSearch } from './albumSearch';
import { useState } from 'react';
import { useGetAlbum } from '../../../query';

interface SearchViewInterface {
  isSearching: boolean;
  searchValue: SearchResponse[] | undefined;
  setSelectedAlbumOrSong: React.Dispatch<
    React.SetStateAction<AlbumInterface | BasePlaylistInterface | undefined>
  >;

  setPlaylistView: (b: boolean) => void;
}

export function SearchView({
  isSearching,
  setPlaylistView,
  setSelectedAlbumOrSong,
}: SearchViewInterface) {
  const [search, setSearch] = useState<string>('');

  const { data: albums } = useGetAlbum(search, 30, 0);

  return (
    <VStack flex={1} w={'100%'}>
      <SearchBar isSearching={isSearching} setSearch={setSearch} />
      <HStack
        flex={1}
        marginTop={'20px'}
        w={'100%'}
        gap={'20px'}
        alignItems={'flex-start'}
        padding={'24px'}
      >
        {albums?.length === 0 && <NoDataSearch albums={albums} />}
        {search && albums && albums?.length !== 0 && (
          <VStack w={'100%'} gap={'20px'}>
            <HStack w={'100%'}>
              <TopResultSearch albums={albums} />
              <SongSearch albums={albums} />
            </HStack>
            <ArtistSearch albums={albums} />
            <AlbumSearch
              albums={albums}
              setPlaylistView={setPlaylistView}
              setSelectedAlbumOrSong={setSelectedAlbumOrSong}
            />
          </VStack>
        )}
      </HStack>
    </VStack>
  );
}
