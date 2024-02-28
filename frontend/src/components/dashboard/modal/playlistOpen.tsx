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
            backgroundColor={'#282828'}
            w={'250px'}
            padding={'16px'}
            borderRadius={'8px'}
          >
            <HStack _hover={{ color: '#ffffff', cursor: 'pointer' }}>
              <Image src="/plus.png" boxSize={'12px'}></Image>
              <Text
                color={'#ffffff9c'}
                fontSize={'14px'}
                _hover={{ color: '#ffffff' }}
                onClick={() =>
                  createPlaylist({
                    name: `Playlist - ${playlistsLength}`,
                  })
                }
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
