import { useEffect, useState } from 'react';
import { HStack, VStack, useMediaQuery } from '@chakra-ui/react';

import { useAudioPlayerContext } from '../../contexts';

import { PlaybarMobile } from './playBarMobile';
import { useGetLovedSong } from '../../query/lovedSong';
import { SongInfo } from './component/songInfo';
import { SongManagement } from './component/songManagement';
import { SongTime } from './component/songTime';
import { SoungSound } from './component/songSound';

interface PlaybarInterface {}

export function Playbar({}: PlaybarInterface) {
  const [wait, setWait] = useState<boolean>(false);

  const {
    togglePlayPause,
    currentSong,
    isPaused,
    setIsPaused,
    isListening,
    isFullScreen,
  } = useAudioPlayerContext();

  const [isLargardThan1000] = useMediaQuery('(min-width: 1000px)');

  const { data: lovedSongs } = useGetLovedSong();

  const isTheSongLiked = () => {
    return lovedSongs?.some((song) => song.songId === currentSong?.id);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const focusedElement = document.activeElement;

      if (event.target instanceof HTMLElement) {
        if (event.target.classList.contains('css-1uid2v1')) {
          return;
        }
      }

      if (focusedElement && focusedElement.tagName === 'INPUT') {
        return;
      }

      if (event.code === 'Space') {
        event.preventDefault();
        togglePlayPause();
        setIsPaused(!isPaused);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlayPause]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFullScreen) setWait(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isFullScreen]);

  useEffect(() => {
    if (!isFullScreen) setWait(isFullScreen);
  }, [isFullScreen]);

  return (
    <VStack w={'100%'} h={'100%'}>
      {isListening && isLargardThan1000 && (
        <HStack
          w={'100%'}
          transition="all 0.5s ease"
          h={'80px'}
          borderRadius={'8px'}
          justifyContent={'space-between'}
          padding={'20px'}
          background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #121212"
        >
          <SongInfo
            currentSong={currentSong}
            isTheSongLiked={isTheSongLiked}
            isFullScreen={wait}
          />

          <VStack flex={3} gap={'20px'}>
            <SongManagement isFullScreen={wait} />

            <SongTime isFullScreen={wait} />
          </VStack>

          <HStack flex={1} alignItems={'center'} justifyContent={'flex-end'}>
            <SoungSound isFullScreen={wait} />
          </HStack>
        </HStack>
      )}
      <PlaybarMobile />
    </VStack>
  );
}
