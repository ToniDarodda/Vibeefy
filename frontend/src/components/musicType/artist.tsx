import { HStack, VStack, Image, Text } from '@chakra-ui/react';

import { GetMusicType, useSearchProvider } from '../../contexts/search.context';
import { MakePictureLargerWithImageLink } from '../../utils';
import { useGetArtistName } from '../../query';
import { NoDataSearch } from '../search/noDataSearch';

export function MusicTypeArtist() {
  const { musicType, search } = useSearchProvider();
  const { data: artists } = useGetArtistName(search);

  return (
    <>
      {musicType === GetMusicType.ARTISTS && artists && artists?.length > 0 ? (
        <HStack
          w={'100%'}
          h={'100%'}
          flexWrap={'wrap'}
          alignItems={'flex-start'}
        >
          {artists?.map((artist, index) => {
            return (
              <VStack
                key={index}
                padding={'16px'}
                cursor={'pointer'}
                borderRadius={'4px'}
                alignItems={'flex-start'}
                _hover={{
                  backgroundColor: '#1a1a1a',
                }}
              >
                <Image
                  src={MakePictureLargerWithImageLink(artist.profilePicture)}
                  boxSize={'180px'}
                  borderRadius={'100px'}
                  objectFit={'cover'}
                />
                <Text>{artist.name}</Text>
                <Text color={'#a7a7a7'}>Artist</Text>
              </VStack>
            );
          })}
        </HStack>
      ) : (
        <NoDataSearch data={artists} />
      )}
    </>
  );
}
