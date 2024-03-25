/* eslint-disable @typescript-eslint/no-unused-vars */
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

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Exécutez la fonction handleResize immédiatement pour définir la hauteur initiale
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setActivePlaybar(isFullScreen ? 'fullPlaybar' : 'playbar');
  }, [isFullScreen]);

  return (
    <VStack
      w="100vw"
      h={`${windowHeight}px`}
      padding="8px"
      backgroundColor="#000000"
      overflow="hidden"
      justifyContent={'flex-end'}
      onContextMenu={(e) => e.preventDefault()}
    >
      <HStack w="100%" minH={isListening ? 'calc(100% - 110px)' : '100%'}>
        {isLargerThan1000 ? (
          <HStack w={'100%'} h={'100%'}>
            <VStack h="100%" flex={5} maxW={'80%'}>
              <Outlet />
            </VStack>
            <VStack h="100%" flex={1} minW="20%">
              <PlaylistQueueBar />
            </VStack>
          </HStack>
        ) : (
          <VStack h="100%" w="100%">
            <Outlet />
          </VStack>
        )}
      </HStack>
      {isListening && (
        <VStack
          w="100%"
          h={'100%'}
          minH={'80px'}
          maxH={isLargerThan1000 ? '90px' : '110px'}
          position="relative"
        >
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
            transition={isFullScreen ? 'opacity 2.5s ease' : 'none'}
            opacity={activePlaybar === 'fullPlaybar' ? 1 : 0}
            pointerEvents={activePlaybar === 'fullPlaybar' ? 'auto' : 'none'}
          >
            <FullPlaybar />
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}
