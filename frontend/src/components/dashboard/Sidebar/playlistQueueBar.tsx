import { useState } from 'react';
import { VStack, HStack, Text, Icon } from '@chakra-ui/react';

import { ModalPlaylistOpen } from '../Modal/playlistOpen';
import { PlaylistType, AlbumInterface } from '../../../interfaces';
import { MdHome, MdSearch } from 'react-icons/md';
import { useAudioPlayerContext } from '../../../contexts';
import { QueueView } from './queueBarView';
import { PlaylistBarView } from './playlistBarView';
import { MdQueue } from 'react-icons/md';
import { IoLibrarySharp } from 'react-icons/io5';

interface PlaylistBarInterface {
  queueView: boolean;
  isLargardThan1000: boolean;
  playlists: PlaylistType[] | undefined;

  setIsSearching: (b: boolean) => void;
  setPlaylistView: (tmp: boolean) => void;
  setSelectedAlbumOrSong: React.Dispatch<
    React.SetStateAction<AlbumInterface | PlaylistType | undefined>
  >;
}

export function PlaylistBar({
  playlists,
  queueView,
  setIsSearching,
  setPlaylistView,
  isLargardThan1000,
  setSelectedAlbumOrSong,
}: PlaylistBarInterface) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const { queue } = useAudioPlayerContext();

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
            w={'100%'}
            borderRadius={'8px'}
            backgroundColor={'#2b2b2b'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #121212"
            padding={'12px'}
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
            >
              <Icon
                as={MdHome}
                color={'#535353'}
                boxSize={'30px'}
                _hover={{ color: '#ffffff' }}
              />
              <Text fontSize={'16px'}>Home</Text>
            </HStack>
            <HStack
              w={'100%'}
              gap={'20%'}
              cursor={'pointer'}
              h={'50px'}
              padding={'12px'}
              borderRadius={'8px'}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                setIsSearching(true);
                setPlaylistView(false);
              }}
            >
              <Icon
                as={MdSearch}
                color={isHovered ? '#ffffff' : '#535353'}
                boxSize={'32px'}
              />
              <Text fontSize={'16px'}>Search</Text>
            </HStack>
          </VStack>
          <VStack
            flex={3}
            w={'100%'}
            borderRadius={'8px'}
            backgroundColor={'#2b2b2b'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #121212"
            padding={'0px 12px 0px'}
            onContextMenu={(e) => {
              e.preventDefault();
              // setModalPlaylistOptionOpen(false);
              // setModalPlaylistOpen(true);
              // setMouseCoord({ clientX: e.clientX, clientY: e.clientY });
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
              w={'100%'}
              gap={'20%'}
              padding={'12px'}
              borderRadius={'8px'}
              onClick={() => setIsSearching(true)}
            >
              <Icon
                as={queueView ? MdQueue : IoLibrarySharp}
                boxSize={'28px'}
                color={'#535353'}
              />
              <Text fontSize={'16px'}>
                {queueView ? 'Your queue' : 'Your library'}
              </Text>
            </HStack>
            <VStack
              gap={'0px'}
              overflow={'scroll'}
              w={'100%'}
              maxW={'100%'}
              height={'100%'}
            >
              {!queueView ? (
                <PlaylistBarView
                  mooseCoord={mooseCoord}
                  playlists={playlists ?? []}
                  isModalPlaylistOptionOpen={isModalPlaylistOptionOpen}
                  setSelectedAlbumOrSong={setSelectedAlbumOrSong}
                  setPlaylistView={setPlaylistView}
                  setMouseCoord={setMouseCoord}
                  setModalPlaylistOptionOpen={setModalPlaylistOptionOpen}
                />
              ) : (
                <QueueView
                  queue={queue}
                  setPlaylistView={setPlaylistView}
                  setSelectedAlbumOrSong={setSelectedAlbumOrSong}
                />
              )}
            </VStack>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}
