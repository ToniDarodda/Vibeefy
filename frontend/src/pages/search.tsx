import { useRef } from 'react';
import { VStack, HStack } from '@chakra-ui/react';

import { SearchBar } from '../components';
import { AlbumSearch } from '../components/dashboard/search/albumSearch';
import { ArtistSearch } from '../components/dashboard/search/artistSearch';
import { NoDataSearch } from '../components/dashboard/search/noDataSearch';
import { SongSearch } from '../components/dashboard/search/songSearch';
import { TopResultSearch } from '../components/dashboard/search/topResultSearch';
import { useGetAlbum } from '../query';
import { useSearchProvider } from '../contexts/search.context';

export function Search() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { search } = useSearchProvider();

  const { data: albums } = useGetAlbum(search, 20, 0);

  return (
    <VStack
      h={'100vh'}
      w={'100%'}
      overflow={'auto'}
      backgroundColor={'#121212'}
    >
      <SearchBar inputRef={inputRef} />
      <HStack
        justifyContent={'center'}
        height={'100%'}
        w={'100%'}
        gap={'20px'}
        padding={'20px'}
      >
        {albums?.length === 0 && <NoDataSearch albums={albums} />}
        {albums && albums?.length !== 0 && (
          <VStack w={'100%'} gap={'20px'} h={'100%'}>
            <HStack w={'100%'} h={'100%'}>
              <TopResultSearch albums={albums} />
              <SongSearch albums={albums} />
            </HStack>
            <ArtistSearch albums={albums} />
            <AlbumSearch albums={albums} />
          </VStack>
        )}
      </HStack>
    </VStack>
  );
}
