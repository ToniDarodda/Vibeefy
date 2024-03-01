import { VStack, HStack, Text, Image } from '@chakra-ui/react';
import { useCreatePlaylist } from '../../../query/playlist';

interface PlaylistOpenInterface {
  isModalPlaylistOpen: boolean;
  mooseCoord: { clientX: number; clientY: number };
  playlistsLength: number | undefined;
}

export function ModalPlaylistOpen({
  isModalPlaylistOpen,
  mooseCoord,
  playlistsLength,
}: PlaylistOpenInterface) {
  const { mutate: createPlaylist } = useCreatePlaylist();

  return (
    <>
      {isModalPlaylistOpen && (
        <VStack
          position={'absolute'}
          top={mooseCoord.clientY}
          left={mooseCoord.clientX}
        >
          <VStack
            backgroundColor={'#42414189'}
            w={'250px'}
            padding={'12px'}
            borderRadius={'8px'}
            onClick={() =>
              createPlaylist({
                name: `Playlist - ${playlistsLength}`,
              })
            }
            _hover={{
              backgroundColor: '#4241413e',
            }}
          >
            <HStack
              _hover={{ color: '#ffffff', cursor: 'pointer' }}
              gap={'30px'}
            >
              <Image src="/plus3.png" boxSize={'30px'}></Image>
              <Text
                color={'#bcbcbc'}
                fontSize={'14px'}
                _hover={{ color: '#ffffff' }}
              >
                Create playlist
              </Text>
            </HStack>
          </VStack>
        </VStack>
      )}
    </>
  );
}
