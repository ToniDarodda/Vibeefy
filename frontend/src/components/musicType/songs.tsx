import { VStack, HStack, Image, Text } from '@chakra-ui/react';

import { GetMusicType, useSearchProvider } from '../../contexts/search.context';
import { truncateText, formatTime } from '../../utils';
import { useGetSongByName } from '../../query';
import { useAudioPlayerContext } from '../../contexts';

export function MusicTypeSong() {
  const { musicType, search } = useSearchProvider();

  const { setCurrentSong, setIsListening } = useAudioPlayerContext();

  const { data: songs } = useGetSongByName(search);

  return (
    <>
      {musicType === GetMusicType.SONGS && songs && songs.length > 0 && (
        <VStack w={'100%'} h={'100vh'}>
          <HStack w={'100%'} justifyContent={'space-between'} h={'60px'}>
            <HStack>
              <Text color={'#a7a7a7'}>#</Text>
              <Text color={'#a7a7a7'}>Title</Text>
            </HStack>
            <Text color={'#a7a7a7'}>Album</Text>
            <Text color={'#a7a7a7'}>Time</Text>
          </HStack>

          <VStack borderBottom={'1px solid #212121'} h={'1px'} w={'100%'} />
          <VStack
            w={'100%'}
            gap={'16px'}
            maxH="calc(100vh - 250px)"
            overflow={'scroll'}
          >
            {songs?.map((song, index) => {
              return (
                <HStack
                  key={index}
                  w={'100%'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  cursor={'pointer'}
                  _hover={{
                    backgroundColor: '#1a1a1a',
                  }}
                  padding={'4px'}
                  borderRadius={'4px'}
                  onClick={() => {
                    setCurrentSong({ ...song, albumName: song.album.title });
                    setIsListening(true);
                  }}
                >
                  <HStack flex={2}>
                    <Text color={'#a7a7a7'} w={'30px'}>
                      {index + 1}
                    </Text>
                    <Image
                      src={song.thumbnails}
                      boxSize={'50px'}
                      borderRadius={'4px'}
                    />
                    <VStack alignItems={'flex-start'}>
                      <Text>{truncateText(song.title, 30)}</Text>
                      <Text color={'#a7a7a7'}>{song.album.title}</Text>
                    </VStack>
                  </HStack>
                  <HStack flex={1}>
                    <Text color={'#a7a7a7'}>{song.album.year}</Text>
                  </HStack>
                  <HStack flex={1} justifyContent={'flex-end'}>
                    <Text color={'#a7a7a7'}>
                      {formatTime(song.songDuration)}
                    </Text>
                  </HStack>
                </HStack>
              );
            })}
          </VStack>
        </VStack>
      )}
    </>
  );
}
