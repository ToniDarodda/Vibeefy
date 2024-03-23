import { VStack, HStack, Text, Image } from '@chakra-ui/react';
import { useCreatePlaylist } from '../../query';
import { useRef } from 'react';

interface PlaylistOpenInterface {
  isModalPlaylistOpen: boolean;
  playlistsLength: number | undefined;
  mooseCoord: { clientX: number; clientY: number };
}

export function ModalPlaylistOpen({
  mooseCoord,
  playlistsLength,
  isModalPlaylistOpen,
}: PlaylistOpenInterface) {
  const { mutate: createPlaylist } = useCreatePlaylist();

  const componentRef = useRef<HTMLDivElement>(null);

  const calculateModalCoordX = (clientX: number) => {
    const { innerWidth: width } = window;
    const componentSize = componentRef.current?.offsetWidth ?? 0;
    if (clientX + componentSize > width) {
      return clientX - componentSize;
    }
    return clientX;
  };

  return (
    <>
      {isModalPlaylistOpen && (
        <VStack
          position={'absolute'}
          top={mooseCoord.clientY}
          left={calculateModalCoordX(mooseCoord.clientX)}
        >
          <VStack
            backgroundColor={'#121212'}
            border={'1px solid #82828267'}
            w={'250px'}
            padding={'12px'}
            alignItems={'flex-start'}
            borderRadius={'8px'}
            onClick={() =>
              createPlaylist({
                name: `Playlist - ${playlistsLength}`,
              })
            }
            ref={componentRef}
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
