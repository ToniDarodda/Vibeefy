import { VStack, HStack, Text, Image } from '@chakra-ui/react';
import { AlbumInterface, SongInterface } from '../../../interfaces';
import { formatTime } from '../../../utils';

interface SongSearchInterface {
  albums: AlbumInterface[];
}

export function SongSearch({ albums }: SongSearchInterface) {
  return (
    <VStack flex={2} justifyContent={'flex-start'} alignItems={'flex-start'}>
      <Text fontSize={'20px'} as={'b'}>
        Songs
      </Text>
      <VStack
        w={'100%'}
        h={'220px'}
        alignItems={'flex-start'}
        padding={'24px'}
        borderRadius={'8px'}
        cursor={'pointer'}
        overflow={'scroll'}
        gap={'12px'}
      >
        {albums?.map((album: AlbumInterface) => {
          return album.songs.map((song: SongInterface, index: number) => {
            return (
              <HStack
                w={'100%'}
                justifyContent={'space-between'}
                key={index}
                padding={'0px 12px 0px 12px'}
                borderRadius={'4px'}
                _hover={{
                  backgroundColor: '#1e1e1e',
                }}
              >
                <HStack>
                  <Image src={song.thumbnails ?? ''} boxSize={'44px'} />
                  <VStack w={'200px'} alignItems={'flex-start'}>
                    <Text fontSize={'14px'}>
                      {song.title.includes('(')
                        ? song.title.split('(')[0]
                        : song.title}
                    </Text>
                    <Text>{album.artist.name}</Text>
                  </VStack>
                </HStack>
                <Text>{formatTime(song.songDuration)}</Text>
              </HStack>
            );
          });
        })}
      </VStack>
    </VStack>
  );
}
