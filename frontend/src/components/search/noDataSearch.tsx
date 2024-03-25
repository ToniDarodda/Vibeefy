import { VStack, HStack, Text } from '@chakra-ui/react';

import { AlbumInterface, RawArtist, RawSong } from '../../interfaces';

interface NoDataSearchInterface {
  data: AlbumInterface[] | RawArtist[] | RawSong[] | undefined;
}

export function NoDataSearch({ data }: NoDataSearchInterface) {
  return (
    <>
      {data && data?.length === 0 && (
        <VStack w={'100%'} justifyContent={'center'} alignItems={'center'}>
          <Text fontSize={'20px'}>No data found...</Text>
          <HStack
            h={'30px'}
            w={'200px'}
            cursor={'pointer'}
            borderRadius={'4px'}
            justifyContent={'center'}
            backgroundColor={'#3d3d3d'}
            _hover={{
              backgroundColor: '#5e5d5d',
            }}
          >
            <Text>Search on youtube</Text>
          </HStack>
        </VStack>
      )}
    </>
  );
}
