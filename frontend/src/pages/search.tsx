import { useRef } from 'react';
import { VStack, HStack } from '@chakra-ui/react';

import { SearchBar } from '../components';
import { GetMusicType, useSearchProvider } from '../contexts/search.context';
import { MusicTypeAll } from '../components/musicType/all';
import { MusicTypeAlbum } from '../components/musicType/album';
import { MusicTypeSong } from '../components/musicType/songs';
import { MusicTypeArtist } from '../components/musicType/artist';

export function Search() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { musicType } = useSearchProvider();

  return (
    <VStack
      h={'100%'}
      w={'100%'}
      backgroundColor={'#121212'}
      overflow={musicType === GetMusicType.SONGS ? 'hidden' : 'scroll'}
    >
      <SearchBar inputRef={inputRef} />
      <HStack
        justifyContent={'center'}
        alignItems={'flex-start'}
        w={'100%'}
        padding={'20px'}
      >
        <MusicTypeAll />
        <MusicTypeArtist />
        <MusicTypeAlbum />
        <MusicTypeSong />
      </HStack>
    </VStack>
  );
}
