import { HStack, useMediaQuery, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Playbar } from '../components';
import { useAudioPlayerContext } from '../contexts';
import { PlaylistQueueBar } from '../components/sidebar/playlistQueueBar';

export function Layout() {
  const { isListening } = useAudioPlayerContext();
  const [isLargardThan1000] = useMediaQuery('(min-width: 1000px)');

  return (
    <VStack
      w={'100vw'}
      h={'100vh'}
      padding={'8px'}
      backgroundColor={'#000000'}
      overflow={'hidden'}
    >
      <HStack w="100%" h={isListening ? '90%' : '100%'}>
        {isLargardThan1000 ? (
          <>
            <VStack h="100%" w={'80%'}>
              <Outlet />
            </VStack>
            <VStack h="100%" w={'20%'} maxW={'20%'}>
              <PlaylistQueueBar />
            </VStack>
          </>
        ) : (
          <VStack h="100%" w={'100%'}>
            <Outlet />
          </VStack>
        )}
      </HStack>
      <VStack w={'100%'} h={'90px'}>
        <Playbar />
      </VStack>
    </VStack>
  );
}
