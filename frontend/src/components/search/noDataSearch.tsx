import { VStack, HStack, Text } from '@chakra-ui/react';

import { AlbumInterface } from '../../interfaces';

interface NoDataSearchInterface {
  albums: AlbumInterface[];
}

export function NoDataSearch({ albums }: NoDataSearchInterface) {
  return (
    <>
      {albums?.length === 0 && (
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
