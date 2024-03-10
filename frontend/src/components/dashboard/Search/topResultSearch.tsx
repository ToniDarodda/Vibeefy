import { VStack, Text, Image } from '@chakra-ui/react';
import { AlbumInterface } from '../../../interfaces';

interface TopResultSearchInterface {
  albums: AlbumInterface[];
}

export function TopResultSearch({ albums }: TopResultSearchInterface) {
  const artistName = albums?.[0]?.artist?.name ?? '';
  const albumThumbnail = albums?.[0]?.thumbnails ?? '/vinyl.png';

  return (
    <VStack flex={1} justifyContent={'flex-start'} alignItems={'flex-start'}>
      <Text fontSize={'20px'} as={'b'}>
        Top result
      </Text>
      <VStack
        w={'100%'}
        h={'220px'}
        backgroundColor={'#161616'}
        alignItems={'flex-start'}
        padding={'24px'}
        borderRadius={'8px'}
        cursor={'pointer'}
        _hover={{
          backgroundColor: '#2d2d2d',
        }}
      >
        <Image src={albumThumbnail} boxSize={'100px'} borderRadius={'100px'} />
        <Text fontSize={'24px'} as={'b'}>
          {artistName}
        </Text>
        <Text color={'#adadad'}>Artist</Text>
      </VStack>
    </VStack>
  );
}
