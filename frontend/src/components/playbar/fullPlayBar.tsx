import { useEffect } from 'react';
import { HStack, VStack, useMediaQuery } from '@chakra-ui/react';

import { useAudioPlayerContext } from '../../contexts';
import { PlaybarMobile } from './playBarMobile';
import { useGetLovedSong } from '../../query/lovedSong';
import { SongTime } from './component/songTime';
import { SoungSound } from './component/songSound';
import { SongInfo } from './component/songInfo';
import { SongManagement } from './component/songManagement';

export function FullPlaybar() {
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

  return (
    <VStack w={'100%'} h={'100%'}>
      {isListening && (
        <VStack
          h={'100%'}
          w={'100%'}
          bottom={'0'}
          padding={'20px'}
          position={'fixed'}
          borderRadius={'8px'}
          alignItems={'flex-end'}
          transition="all 0.5s ease"
          justifyContent={'space-between'}
          sx={{
            background:
              `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ` +
              `url("${currentSong?.thumbnails.replaceAll('544', '1500') ?? ''}") center/cover no-repeat, ` +
              `linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #121212`,
          }}
        >
          <HStack w={'100%'} h={'90%'} justifyContent={'center'}>
            <VStack w={'90%'} h={'100%'} alignItems={'flex-start'} gap={'40px'}>
              <HStack flex={1} w={'100%'} alignItems={'flex-end'}>
                <SongInfo
                  isFullScreen={isFullScreen}
                  currentSong={currentSong}
                  isTheSongLiked={isTheSongLiked}
                />
                <HStack
                  flex={1}
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                  display={isLargardThan1000 ? 'flex' : 'none'}
                >
                  <SoungSound isFullScreen={isFullScreen} />
                </HStack>
              </HStack>

              <SongTime isFullScreen={isFullScreen} />

              <HStack w={'100%'} justifyContent={'center'}>
                <VStack gap={'20px'} w={'100%'}>
                  <SongManagement isFullScreen={isFullScreen} />
                </VStack>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      )}
      <PlaybarMobile />
    </VStack>
  );
}
