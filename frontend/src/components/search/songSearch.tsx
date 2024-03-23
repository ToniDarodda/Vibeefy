import { VStack, HStack, Text, Image, useMediaQuery } from '@chakra-ui/react';
import { AlbumInterface, SongInterface } from '../../interfaces';
import { formatTime } from '../../utils';
import { useAudioPlayerContext } from '../../contexts';
import { truncateText } from '../../utils/truncatText';

interface SongSearchInterface {
  albums: AlbumInterface[];
}

export function SongSearch({ albums }: SongSearchInterface) {
  const { setCurrentSong, currentSong, isPaused, setIsListening } =
    useAudioPlayerContext();
  const [isLargardThan800] = useMediaQuery('(min-width: 800px)');
  const [isLargardThan400] = useMediaQuery('(min-width: 400px)');

  return (
    <VStack flex={2} justifyContent={'flex-start'} alignItems={'flex-start'}>
      <Text fontSize={'20px'} as={'b'}>
        Songs
      </Text>
      <VStack
        w={'100%'}
        h={'220px'}
        gap={'12px'}
        cursor={'pointer'}
        overflow={'scroll'}
        borderRadius={'8px'}
        alignItems={'flex-start'}
        padding={isLargardThan800 ? '24px' : isLargardThan400 ? '12px' : '4px'}
      >
        {albums?.map((album: AlbumInterface) => {
          return album.songs.map((song: SongInterface, index: number) => {
            return (
              <HStack
                w={'100%'}
                key={index}
                borderRadius={'4px'}
                padding={'0px 12px 0px 12px'}
                justifyContent={'space-between'}
                backgroundColor={currentSong?.id === song.id ? '#1e1e1e' : ''}
                _hover={{
                  backgroundColor: '#1e1e1e',
                }}
                onClick={() => {
                  setCurrentSong({
                    ...song,
                    albumName: album.title,
                  });
                  setIsListening(true);
                }}
              >
                <HStack>
                  <Image
                    src={
                      currentSong?.id === song.id
                        ? isPaused
                          ? 'pause.gif'
                          : '/playing.gif'
                        : song.thumbnails ?? ''
                    }
                    boxSize={'44px'}
                  />
                  <VStack
                    alignItems={'flex-start'}
                    w={{ base: '100px', sm: '150px', md: '200px' }}
                  >
                    <Text fontSize={'14px'}>
                      {song.title.includes('(')
                        ? truncateText(song.title.split('(')[0], 10)
                        : truncateText(
                            song.title,
                            isLargardThan400
                              ? isLargardThan800
                                ? 35
                                : 20
                              : 10,
                          )}
                    </Text>
                    <Text>
                      {truncateText(
                        album.artist.name,
                        isLargardThan400 ? (isLargardThan800 ? 35 : 20) : 10,
                      )}
                    </Text>
                  </VStack>
                </HStack>
                <Text display={isLargardThan800 ? 'initial' : 'none'}>
                  {formatTime(song.songDuration)}
                </Text>
              </HStack>
            );
          });
        })}
      </VStack>
    </VStack>
  );
}
