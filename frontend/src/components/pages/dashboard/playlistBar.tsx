import { useState } from 'react';
import { VStack, HStack, Text, Image } from '@chakra-ui/react';

import { ModalPlaylistOpen } from './modal/playlistOpen';
import { ModalPlaylistOption } from './modal/playlistOption';
import { PlaylistType } from '../../../interfaces/playlist';
import { AlbumInterface } from '../../../interfaces/artist';

interface PlaylistBarInterface {
  isLargardThan1000: boolean;
  playlists: PlaylistType[] | undefined;
  setIsSearching: (b: boolean) => void;
  setPlaylistView: (b: boolean) => void;
  setSelectedAlbumOrSong: React.Dispatch<
    React.SetStateAction<AlbumInterface | PlaylistType | undefined>
  >;
}

export function PlaylistBar({
  playlists,
  setIsSearching,
  setPlaylistView,
  isLargardThan1000,
  setSelectedAlbumOrSong,
}: PlaylistBarInterface) {
  const [isModalPlaylistOpen, setModalPlaylistOpen] = useState<boolean>(false);
  const [isModalPlaylistOptionOpen, setModalPlaylistOptionOpen] =
    useState<boolean>(false);
  const [mooseCoord, setMouseCoord] = useState<{
    clientX: number;
    clientY: number;
  }>({ clientX: 0, clientY: 0 });

  return (
    <VStack flex={1} h={'100%'} display={isLargardThan1000 ? 'normal' : 'none'}>
      {isLargardThan1000 && (
        <VStack w={'100%'} h={'100%'} flex={1} borderRadius={'8px'}>
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
              setModalPlaylistOptionOpen(false);
              setModalPlaylistOpen(true);
              setMouseCoord({ clientX: e.clientX, clientY: e.clientY });
            }}
            contextMenu={'preventDefault'}
            onClick={() => {
              setModalPlaylistOpen(false);
              setModalPlaylistOptionOpen(false);
            }}
          >
            <ModalPlaylistOpen
              isModalPlaylistOpen={isModalPlaylistOpen}
              mooseCoord={mooseCoord}
              playlistsLength={playlists?.length}
            />
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
              overflow={'auto'}
              w={'100%'}
              h={'500px'}
              onScroll={(e) => console.log(e)}
            >
              {playlists?.map((playlist: PlaylistType, idx: number) => {
                return (
                  <VStack key={idx} w={'100%'}>
                    <HStack
                      w={'100%'}
                      alignItems={'center'}
                      justifyContent={'flex-start'}
                      gap={'40px'}
                      onClick={() => {
                        setSelectedAlbumOrSong(playlist);
                        setPlaylistView(true);
                      }}
                    >
                      <VStack
                        w={'60px'}
                        h={'60px'}
                        justifyContent={'center'}
                        backgroundColor={'#0000003e'}
                        borderRadius={'8px'}
                      >
                        <Image src="/vinyl.png" boxSize={'50px'}></Image>
                      </VStack>
                      <Text
                        key={idx}
                        color={'#ffffff'}
                        cursor={'pointer'}
                        onContextMenu={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setMouseCoord({
                            clientX: e.clientX,
                            clientY: e.clientY,
                          });

                          setModalPlaylistOptionOpen(true);
                        }}
                      >
                        {playlist.name}
                      </Text>
                      <ModalPlaylistOption
                        isModalPlaylistOptionOpen={isModalPlaylistOptionOpen}
                        mooseCoord={mooseCoord}
                      />
                    </HStack>
                  </VStack>
                );
              })}
            </VStack>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}
