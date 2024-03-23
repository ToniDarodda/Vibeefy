import { HStack, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Playbar } from '../components';
import { useAudioPlayerContext } from '../contexts';
import { PlaylistQueueBar } from '../components/dashboard/sidebar/playlistQueueBar';

export function Layout() {
  const { isListening } = useAudioPlayerContext();
  return (
    <VStack
      w={'100vw'}
      h={'100vh'}
      padding={'8px'}
      backgroundColor={'#000000'}
      overflow={'hidden'}
    >
      <HStack w="100%" h={isListening ? '90%' : '100%'}>
        <VStack h="100%" w={'80%'}>
          <Outlet />
        </VStack>
        <VStack h="100%" w={'20%'}>
          <PlaylistQueueBar />
        </VStack>
      </HStack>
      <VStack w={'100%'} h={'90px'}>
        <Playbar />
      </VStack>
    </VStack>
  );
}
