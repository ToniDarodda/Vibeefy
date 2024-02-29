import { useState } from 'react';
import { VStack, useMediaQuery } from '@chakra-ui/react';

import { Playbar } from '../components';
import { PlaylistBar } from '../components/dashboard/playlistBar';
import { AlbumBoard } from '../components/dashboard/albumBoard';

export function Dashboard() {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [songPlaying, setSongPlaying] = useState<string>('');

  const [isLargardThan1000] = useMediaQuery('(min-width: 1000px)');

  return (
    <VStack h={'100vh'} backgroundColor={'#1E1E1E'}>
      <VStack w={'100%'} h={'100%'} padding={'8px'}>
        <VStack
          flex={1}
          w={'100%'}
          overflow={'hidden'}
          overflowX={'hidden'}
          overflowY={'hidden'}
          flexDirection={'row'}
        >
          <VStack
            flex={4}
            h={'100%'}
            overflow={'auto'}
            borderRadius={'8px'}
            backgroundColor={'#2b2b2b'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #2B2B2B"
          >
            <AlbumBoard
              isLargardThan1000={isLargardThan1000}
              isSearching={isSearching}
              setIsListening={setIsListening}
              setSongPlaying={setSongPlaying}
            />
          </VStack>
          <PlaylistBar
            isLargardThan1000={isLargardThan1000}
            setIsSearching={setIsSearching}
          />
        </VStack>
        <Playbar
          isListening={isListening}
          listeningSong={songPlaying}
          isLargerThan1000={isLargardThan1000}
          setIsSearching={setIsSearching}
        />
      </VStack>
    </VStack>
  );
}
