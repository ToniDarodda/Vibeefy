/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import {
  HStack,
  Text,
  Image,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Progress,
  Stack,
  Spinner,
} from '@chakra-ui/react';

import { PlaybarMobile } from './playBarMobile';
import { SearchResponse } from '../../../interfaces/search';
import { formatTime } from '../../../utils/formatTime';
import { useAudioPlayerContext } from '../../../contexts/playerContext';

interface PlaybarInterface {
  isListening: boolean;
  isLargerThan1000: boolean;
  searchValue: SearchResponse[] | undefined;

  togglePlayPause: () => void;
  setIsSearching: (b: boolean) => void;
}

export function Playbar({
  searchValue,
  isListening,
  setIsSearching,
  isLargerThan1000,
}: PlaybarInterface) {
  const {
    duration,
    setVolume,
    togglePlayPause,
    seek,
    setTime,
    currentSong,
    playNext,
    playPrev,
    isPlaying,
  } = useAudioPlayerContext();

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(30);

  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleBarChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const widthComputed = rect.width;
    const result = ((e.clientX - rect.left) * 100) / widthComputed;

    setTime((result / 100) * duration!);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement) {
        if (event.target.classList.contains('css-1uid2v1')) {
          return;
        }
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
    <>
      {isListening && isLargerThan1000 && (
        <HStack
          w={'100%'}
          h={'80px'}
          borderRadius={'8px'}
          backgroundColor={'#3d3d3d'}
          justifyContent={'space-between'}
          padding={'20px'}
          background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #2B2B2B"
        >
          <HStack flex={1} gap={'20px'}>
            <Image src={currentSong?.thumbnails} boxSize={'60px'} />
            <VStack alignItems={'flex-start'}>
              <Text color={'#ffffff'}>{currentSong?.title}</Text>
              <Text color={'#ffffff62'}>Saison 2</Text>
            </VStack>
            <Image src="/like.png" boxSize={'16px'} cursor={'pointer'} />
          </HStack>

          <VStack flex={3} gap={'20px'}>
            <HStack gap={'60px'}>
              <Image
                src="/nextl.png"
                cursor={'pointer'}
                boxSize={'20px'}
                onClick={playPrev}
              />
              {!isPlaying && currentSong?.videoId && !isPaused && (
                <Spinner boxSize={'38px'} color="#ffffff" />
              )}
              {(isPlaying || isPaused) && (
                <Image
                  src={isPaused ? 'pause2.png' : '/pause.png'}
                  cursor={'pointer'}
                  boxSize={'38px'}
                  onClick={() => {
                    togglePlayPause();
                    setIsPaused(!isPaused);
                  }}
                />
              )}
              <Image
                src="/nextr.png"
                cursor={'pointer'}
                boxSize={'20px'}
                onClick={playNext}
              />
            </HStack>
            <HStack
              w={'90%'}
              h={'4px'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Text color={'#ffffff'} textAlign={'center'}>
                {`${formatTime(Math.round(seek))}`}
              </Text>
              <Stack spacing={5} h={'100%'} w={'80%'}>
                <Progress
                  ref={progressBarRef}
                  colorScheme="orange"
                  cursor={'pointer'}
                  size="md"
                  value={
                    duration
                      ? (Math.round(seek) * 100) / duration
                      : (Math.round(seek) * 100) / 180
                  }
                  onClick={handleBarChange}
                  borderRadius={'8px'}
                />
              </Stack>
              <Text color={'#ffffff'} textAlign={'center'}>
                {formatTime(Math.round(duration!))}
              </Text>
            </HStack>
          </VStack>

          <HStack
            flex={1}
            alignItems={'center'}
            justifyContent={'flex-end'}
            gap={sliderValue === 0 ? '20px' : '20px'}
          >
            <Image
              src={sliderValue === 0 ? 'volume-mute.png' : '/volume.png'}
              boxSize={sliderValue === 0 ? '24px' : '30px'}
            />

            <Slider
              w={'50%'}
              aria-label="slider-ex-1"
              defaultValue={sliderValue}
              colorScheme="orange"
              onChange={(e) => {
                setVolume(e);
                setSliderValue(e);
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={'10px'} borderColor={'orange'} />
            </Slider>
          </HStack>
        </HStack>
      )}
      <PlaybarMobile
        isPaused={isPaused}
        setIsSearching={setIsSearching}
        setIsPaused={setIsPaused}
        listeningSong={currentSong?.title ?? ''}
        playNext={playNext}
        togglePlayPause={togglePlayPause}
        thumbnail={currentSong?.thumbnails ?? ''}
        isLargerThan1000={isLargerThan1000}
      ></PlaybarMobile>
    </>
  );
}
