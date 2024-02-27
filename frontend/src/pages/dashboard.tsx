import { VStack, Text, useMediaQuery, HStack, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { SearchBar, Playbar } from '../components';

export function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isListening, setIsListening] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [songPlaying, setSongPlaying] = useState<string>('');

  const activeListening = (songPlaying: string) => {
    setIsListening(true);
    setSongPlaying(songPlaying);
  };

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
            overflow={'scroll'}
            borderRadius={'8px'}
            backgroundColor={'#2b2b2b'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #2B2B2B"
          >
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
                ].map((name: string) => {
                  return (
                    <VStack
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
          </VStack>
          {isLargardThan1000 && (
            <VStack h={'100%'} flex={1} borderRadius={'8px'}>
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
                // border={'1px solid rgba(253, 147, 52, 0.30)'}
              >
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
                    Your playlist
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          )}
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
