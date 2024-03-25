import { VStack, HStack } from '@chakra-ui/react';

import { GetMusicType, useSearchProvider } from '../../contexts/search.context';
import { AlbumSearch } from '../search/albumSearch';
import { ArtistSearch } from '../search/artistSearch';
import { SongSearch } from '../search/songSearch';
import { TopResultSearch } from '../search/topResultSearch';
import { useGetAlbum } from '../../query';

export function MusicTypeAll() {
  const { musicType, search } = useSearchProvider();

  const { data: albums } = useGetAlbum(search, 30, 0);

  return (
    <>
      {albums && musicType === GetMusicType.ALL && (
        <VStack w={'100%'} gap={'20px'} h={'100%'}>
          <HStack w={'100%'} h={'100%'}>
            <TopResultSearch albums={albums} />
            <SongSearch albums={albums} />
          </HStack>
          <ArtistSearch albums={albums} />
          <VStack w={'100%'}>
            <AlbumSearch albums={albums} />
          </VStack>
        </VStack>
      )}
    </>
  );
}
