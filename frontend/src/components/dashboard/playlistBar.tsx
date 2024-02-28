import { VStack, HStack, Text, Image } from '@chakra-ui/react';
import { PlaylistType } from '../../interfaces/playlist';
import { useCreatePlaylist, useGetPlaylist } from '../../query/playlist';
import { useState } from 'react';

interface PlaylistBarInterface {
  isLargardThan1000: boolean;
  setIsSearching: (b: boolean) => void;
}

export function PlaylistBar({
  isLargardThan1000,
  setIsSearching,
}: PlaylistBarInterface) {
  const [isModalPlaylistOpen, setModalPlaylistOpen] = useState<boolean>(false);
  const [mooseCoord, setMouseCoord] = useState<{
    clientX: number;
    clientY: number;
  }>({ clientX: 0, clientY: 0 });

  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data: playlists } = useGetPlaylist();

  return (
    <VStack flex={1} h={'100%'} display={isLargardThan1000 ? 'normal' : 'none'}>
      {isLargardThan1000 && (
        <VStack w={'100%'} flex={1} borderRadius={'8px'}>
          <VStack
            flex={1}
            w={'100%'}
            borderRadius={'8px'}
            backgroundColor={'#2b2b2b'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #2B2B2B"
            padding={'24px'}
            alignItems={'flex-start'}
            gap={'20px'}
          >
            <HStack
              h={'50px'}
              w={'100%'}
              gap={'20%'}
              padding={'12px'}
              cursor={'pointer'}
              borderRadius={'8px'}
              onClick={() => setIsSearching(false)}
              _hover={{
                backgroundColor: '#3d3d3d',
              }}
            >
              <Image src="/home.png" boxSize={'28px'} />
              <Text color={'#ffffff'} fontSize={'18px'}>
                Home
              </Text>
            </HStack>
            <HStack
              w={'100%'}
              gap={'20%'}
              cursor={'pointer'}
              h={'50px'}
              padding={'12px'}
              borderRadius={'8px'}
              _hover={{
                backgroundColor: '#3d3d3d',
              }}
              onClick={() => setIsSearching(true)}
            >
              <Image src="/loop.png" boxSize={'28px'} />
              <Text color={'#ffffff'} fontSize={'18px'}>
                Search
              </Text>
            </HStack>
          </VStack>
          <VStack
            flex={3}
            w={'100%'}
            borderRadius={'8px'}
            backgroundColor={'#2b2b2b'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #2B2B2B"
            padding={'24px'}
            onContextMenu={(e) => {
              e.preventDefault();
              setModalPlaylistOpen(true);
              setMouseCoord({ clientX: e.clientX, clientY: e.clientY });
            }}
            contextMenu={'preventDefault'}
            onClick={() => setModalPlaylistOpen(false)}
          >
            {isModalPlaylistOpen && (
              <VStack
                position={'absolute'}
                top={mooseCoord.clientY}
                left={mooseCoord.clientX}
              >
                <VStack
                  backgroundColor={'#3d3d3d'}
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
                          name: `Playlist - ${playlists?.length}`,
                        })
                      }
                    >
                      Create playlist
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            )}
            <HStack
              h={'50px'}
              w={'100%'}
              gap={'20%'}
              padding={'12px'}
              borderRadius={'8px'}
              onClick={() => setIsSearching(true)}
            >
              <Image src="/pl.png" boxSize={'28px'} />
              <Text color={'#ffffff'} fontSize={'18px'}>
                Your library
              </Text>
            </HStack>
            <VStack
              gap={'20px'}
              overflow={'scroll'}
              w={'100%'}
              h={'500px'}
              onScroll={(e) => console.log(e)}
            >
              {playlists?.map((playlist: PlaylistType) => {
                return (
                  <Text
                    color={'#ffffff'}
                    cursor={'pointer'}
                    onContextMenu={(e) => {
                      e.stopPropagation(); // Stops the event from reaching the parent VStack's onContextMenu
                      e.preventDefault(); // Optional: Prevent the browser's default context menu
                      // Implement your specific right-click behavior here
                      console.log(
                        `Right-clicked on playlist: ${playlist.name}`,
                      );
                    }}
                  >
                    {playlist.name}
                  </Text>
                );
              })}
            </VStack>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}
