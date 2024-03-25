import { useRef } from 'react';
import { VStack, HStack, Text, Image } from '@chakra-ui/react';

import { useCreatePlaylist } from '../../query';
import { useModalProvider } from '../../contexts/modal.context';

interface PlaylistOpenInterface {
  isModalPlaylistOpen: boolean;
  playlistsLength: number | undefined;
}

export function ModalPlaylistOpen({
  playlistsLength,
  isModalPlaylistOpen,
}: PlaylistOpenInterface) {
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { calculateModalCoordX, mouseCoord } = useModalProvider();

  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isModalPlaylistOpen && (
        <VStack
          position={'absolute'}
          top={mouseCoord.clientY}
          left={calculateModalCoordX(mouseCoord.clientX, componentRef)}
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
