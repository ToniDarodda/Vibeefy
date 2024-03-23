import { useState } from 'react';
import { VStack, HStack, Text, Icon, useMediaQuery } from '@chakra-ui/react';

import { MdHome, MdSearch } from 'react-icons/md';

import { QueueView } from './queueBarView';
import { PlaylistBarView } from './playlistBarView';
import { MdQueue } from 'react-icons/md';
import { IoLibrarySharp } from 'react-icons/io5';
import { ModalPlaylistCode } from '../modal/addPlaylistCode';
import { useViewStateContext } from '../../contexts/viewState.context';
import { useGetPlaylist } from '../../query';
import { useNavigate } from 'react-router-dom';
import { useSearchProvider } from '../../contexts/search.context';
import { useAudioPlayerContext } from '../../contexts';

export function PlaylistQueueBar() {
  const navigate = useNavigate();

  const { setInputValue } = useSearchProvider();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isHoveredLoop, setIsHoveredLoop] = useState(false);

  const { isListening } = useAudioPlayerContext();

  const [isModalPlaylistOptionOpen, setModalPlaylistOptionOpen] =
    useState<boolean>(false);
  const [mooseCoord, setMouseCoord] = useState<{
    clientX: number;
    clientY: number;
  }>({ clientX: 0, clientY: 0 });

  const { queueState } = useViewStateContext();

  const { data: playlists } = useGetPlaylist();

  const [isLargardThan1000] = useMediaQuery('(min-width: 1000px)');

  const handleNavigateHome = () => {
    setInputValue('');
    navigate('/search');
  };

  return (
    <VStack
      w={'100%'}
      h={'100%'}
      display={isLargardThan1000 ? 'normal' : 'none'}
    >
      {isLargardThan1000 && (
        <VStack w={'100%'} h={'100%'} flex={1} borderRadius={'8px'}>
          <VStack
            w={'100%'}
            gap={'20px'}
            padding={'12px'}
            borderRadius={'8px'}
            alignItems={'flex-start'}
            backgroundColor={'#2b2b2b'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #121212"
          >
            <HStack
              h={'50px'}
              w={'100%'}
              gap={'20%'}
              padding={'12px'}
              cursor={'pointer'}
              borderRadius={'8px'}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleNavigateHome}
            >
              <Icon
                as={MdHome}
                boxSize={'30px'}
                color={isHovered ? '#ffffff' : '#535353'}
              />
              <Text fontSize={'16px'}>Home</Text>
            </HStack>
            <HStack
              w={'100%'}
              h={'50px'}
              gap={'20%'}
              padding={'12px'}
              cursor={'pointer'}
              borderRadius={'8px'}
              onMouseEnter={() => setIsHoveredLoop(true)}
              onMouseLeave={() => setIsHoveredLoop(false)}
              onClick={() => {}}
            >
              <Icon
                as={MdSearch}
                color={isHoveredLoop ? '#ffffff' : '#535353'}
                boxSize={'32px'}
              />
              <Text fontSize={'16px'}>Search</Text>
            </HStack>
          </VStack>
          <VStack
            flex={3}
            w={'100%'}
            borderRadius={'8px'}
            padding={'0px 12px 0px'}
            backgroundColor={'#2b2b2b'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #121212"
            onContextMenu={(e) => {
              e.preventDefault();
              setModalPlaylistOptionOpen(false);
              setMouseCoord({ clientX: e.clientX, clientY: e.clientY });
            }}
            contextMenu={'preventDefault'}
            onClick={() => {
              setModalPlaylistOptionOpen(false);
            }}
          >
            <HStack
              w={'100%'}
              h={'70px'}
              padding={'20px'}
              borderRadius={'8px'}
              justifyContent={'space-between'}
            >
              <Icon
                as={queueState ? MdQueue : IoLibrarySharp}
                boxSize={'28px'}
                color={'#535353'}
              />
              <Text fontSize={'16px'}>{queueState ? 'Queue' : 'Playlist'}</Text>
              <ModalPlaylistCode />
            </HStack>
            <VStack
              gap={'0px'}
              w={'100%'}
              height={'100%'}
              maxH={isListening ? '540px' : '620px'}
              justifyContent={'space-between'}
            >
              {!queueState ? (
                <PlaylistBarView
                  mooseCoord={mooseCoord}
                  playlists={playlists ?? []}
                  isModalPlaylistOptionOpen={isModalPlaylistOptionOpen}
                  setMouseCoord={setMouseCoord}
                  setModalPlaylistOptionOpen={setModalPlaylistOptionOpen}
                />
              ) : (
                <QueueView />
              )}
            </VStack>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}
