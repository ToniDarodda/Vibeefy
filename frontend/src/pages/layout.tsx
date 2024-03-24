import { useState, useEffect } from 'react';
import { HStack, VStack, useMediaQuery } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { Playbar } from '../components';
import { useAudioPlayerContext } from '../contexts';
import { PlaylistQueueBar } from '../components/sidebar/playlistQueueBar';
import { FullPlaybar } from '../components/playbar/fullPlayBar';

export function Layout() {
  const { isListening, isFullScreen } = useAudioPlayerContext();
  const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');

  const [activePlaybar, setActivePlaybar] = useState('playbar');

  useEffect(() => {
    setActivePlaybar(isFullScreen ? 'fullPlaybar' : 'playbar');
  }, [isFullScreen]);

  return (
    <VStack
      w="100vw"
      h="100vh"
      padding="8px"
      backgroundColor="#000000"
      overflow="hidden"
    >
      <HStack w="100%" h={isListening ? '90%' : '100%'}>
        {isLargerThan1000 ? (
          <>
            <VStack h="100%" w="80%">
              <Outlet />
            </VStack>
            <VStack h="100%" w="20%" maxW="20%">
              <PlaylistQueueBar />
            </VStack>
          </>
        ) : (
          <VStack h="100%" w="100%">
            <Outlet />
          </VStack>
        )}
      </HStack>
      <VStack w="100%" h="90px" position="relative">
        <VStack
          position="absolute"
          width="100%"
          height="100%"
          opacity={activePlaybar === 'playbar' ? 1 : 0}
          transition={!isFullScreen ? 'none' : 'opacity 0.5s ease'}
          pointerEvents={activePlaybar === 'playbar' ? 'auto' : 'none'}
        >
          <Playbar />
        </VStack>

        <VStack
          position="absolute"
          width="100%"
          height="100%"
          transition={isFullScreen ? 'opacity 1s ease' : 'none'}
          opacity={activePlaybar === 'fullPlaybar' ? 1 : 0}
          pointerEvents={activePlaybar === 'fullPlaybar' ? 'auto' : 'none'}
        >
          <FullPlaybar />
        </VStack>
      </VStack>
    </VStack>
  );
}
