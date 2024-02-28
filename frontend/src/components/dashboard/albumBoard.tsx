import { VStack, HStack, Text } from '@chakra-ui/react';
import { SearchBar } from './searchBar';

interface AlbumBoardInterface {
  setIsListening: (b: boolean) => void;
  isSearching: boolean;
  isLargardThan1000: boolean;
  setSongPlaying: (b: string) => void;
}

export function AlbumBoard({
  setIsListening,
  isSearching,
  setSongPlaying,
  isLargardThan1000,
}: AlbumBoardInterface) {
  const activeListening = (songPlaying: string) => {
    setIsListening(true);
    setSongPlaying(songPlaying);
  };
  return (
    <>
      <SearchBar
        isSearching={isSearching}
        isLargerThan1000={isLargardThan1000}
      />
      <VStack flex={1} w={'100%'} padding={'40px'}>
        <HStack
          flex={1}
          w={'100%'}
          gap={'20px'}
          flexWrap={'wrap'}
          justifyContent={'center'}
        >
          {[
            'Love me',
            'Goulag',
            'Less me',
            'Top',
            'Less me',
            'Tryna',
            'Less me',
            'Tryna',
            'Go fast',
            'Tryna',
            'Tryna',
            'Go fast',
            'Tryna',
            'Go fast',
            'Tryna',
            'Go fast',
            'Tryna',
          ].map((name: string, indx) => {
            return (
              <VStack
                key={indx}
                w={{
                  base: '120px',
                  sm: '150px',
                  md: '200px',
                }}
                h={{
                  base: '120px',
                  sm: '150px',
                  md: '200px',
                }}
                borderRadius={'8px'}
                backgroundColor={'#4e4e4e4e'}
                box-shadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                alignItems={'center'}
                justifyContent={'flex-end'}
                onClick={() => activeListening(name)}
              >
                <Text color={'#ffffff'}>{name}</Text>
              </VStack>
            );
          })}
        </HStack>
      </VStack>
    </>
  );
}
