import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { VStack, HStack, Image, Text } from '@chakra-ui/react';

import { GetMusicType, useSearchProvider } from '../../contexts/search.context';
import { truncateText, formatTime } from '../../utils';
import { useGetSongByName } from '../../query';
import { useAudioPlayerContext } from '../../contexts';
import { RawSong } from '../../interfaces';

interface SongItemInterface {
  song: RawSong;
  index: number;
  onSongClick: (song: RawSong) => void;
}

const SongItem = memo(({ song, index, onSongClick }: SongItemInterface) => (
  <HStack
    w={'100%'}
    justifyContent={'space-between'}
    alignItems={'center'}
    cursor={'pointer'}
    _hover={{
      backgroundColor: '#1a1a1a',
    }}
    padding={'4px'}
    borderRadius={'4px'}
    onClick={() => onSongClick(song)}
    gap={'20px'}
  >
    <HStack flex={1}>
      <Text color={'#a7a7a7'} w={'30px'}>
        {index + 1}
      </Text>
      <Image src={song.thumbnails} boxSize={'50px'} borderRadius={'4px'} />
      <VStack alignItems={'flex-start'}>
        <Text>{truncateText(song.title, 30)}</Text>
        <Text color={'#a7a7a7'}>{song.album.artist.name}</Text>
      </VStack>
    </HStack>
    <HStack flex={1} justifyContent={'center'}>
      <Text color={'#a7a7a7'}>{song.album.title}</Text>
    </HStack>
    <HStack flex={1} justifyContent={'flex-end'}>
      <Text color={'#a7a7a7'}>{formatTime(song.songDuration)}</Text>
    </HStack>
  </HStack>
));

export function MusicTypeSong() {
  const compRef = useRef<HTMLDivElement>(null);

  const [numberFetch, setNumberFetch] = useState<number>(40);
  const [isTop, setIsTop] = useState<boolean>(false);
  const [initialScrollPosition, setInitialScrollPosition] = useState<number>(0);

  const { musicType, search } = useSearchProvider();

  const { setCurrentSong, setIsListening } = useAudioPlayerContext();

  const { data: songs } = useGetSongByName(search, numberFetch);

  const handleScrollToBottom = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollMax =
      e.currentTarget.scrollHeight - e.currentTarget.offsetHeight;

    const scrollPosition = e.currentTarget.scrollTop;

    if (scrollPosition !== 0) setIsTop(false);
    else setIsTop(true);

    if (scrollMax === scrollPosition && numberFetch < 100) {
      setInitialScrollPosition(scrollPosition);
      setNumberFetch((prev) => prev + 20);
    }
  };

  const onSongClick = useCallback(
    (song: RawSong) => {
      setCurrentSong({ ...song, albumName: song.album.title });
      setIsListening(true);
    },
    [setCurrentSong, setIsListening],
  );

  useEffect(() => {
    if (
      songs &&
      compRef.current !== null &&
      compRef.current.scrollHeight - compRef.current.offsetHeight !==
        compRef.current.scrollTop
    )
      compRef.current.scrollTo({ top: initialScrollPosition });
  }, [initialScrollPosition, songs]);

  return (
    <>
      {musicType === GetMusicType.SONGS && songs && songs.length > 0 && (
        <VStack w={'100%'} h={'100vh'}>
          <HStack
            w={'100%'}
            justifyContent={'space-between'}
            h={'60px'}
            padding={'10px'}
            borderRadius={'4px'}
            backgroundColor={isTop ? 'transparent' : '#202020'}
          >
            <HStack flex={1}>
              <Text color={'#a7a7a7'}>#</Text>
              <Text color={'#a7a7a7'}>Title</Text>
            </HStack>
            <VStack flex={1}>
              <Text color={'#a7a7a7'}>Album</Text>
            </VStack>
            <VStack flex={1} alignItems={'flex-end'}>
              <Text color={'#a7a7a7'}>Time</Text>
            </VStack>
          </HStack>

          <VStack borderBottom={'1px solid #212121'} h={'1px'} w={'100%'} />
          <VStack
            w={'100%'}
            gap={'16px'}
            maxH="calc(100vh - 250px)"
            overflow={'scroll'}
            ref={compRef}
            onScroll={handleScrollToBottom}
          >
            {songs?.map((song, index) => {
              return (
                <SongItem
                  key={song.id}
                  song={song}
                  index={index}
                  onSongClick={onSongClick}
                />
              );
            })}
          </VStack>
        </VStack>
      )}
    </>
  );
}
