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
  Icon,
} from '@chakra-ui/react';
import { MdOutlineQueueMusic, MdOutlinePlaylistPlay } from 'react-icons/md';

import { PlaybarMobile } from './playBarMobile';
import { useAudioPlayerContext } from '../../../contexts';
import { SearchResponse } from '../../../interfaces';
import { formatTime } from '../../../utils';

interface PlaybarInterface {
  queueView: boolean;
  isListening: boolean;
  isLargerThan1000: boolean;
  searchValue: SearchResponse[] | undefined;

  togglePlayPause: () => void;
  setQueueView: (tmp: boolean) => void;
  setIsSearching: (tmp: boolean) => void;
}

export function Playbar({
  queueView,
  searchValue,
  isListening,
  setQueueView,
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
    isPaused,
    setIsPaused,
  } = useAudioPlayerContext();

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
          justifyContent={'space-between'}
          padding={'20px'}
          background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #121212"
        >
          <HStack flex={1} gap={'20px'}>
            <Image src={currentSong?.thumbnails} boxSize={'60px'} />
            <VStack alignItems={'flex-start'}>
              <Text>{currentSong?.title}</Text>
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
                  src={!isPlaying ? 'pause2.png' : '/pause.png'}
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
              <Text textAlign={'center'}>
                {`${formatTime(Math.round(seek))}`}
              </Text>
              <Stack spacing={5} h={'100%'} w={'80%'}>
                <Progress
                  cursor={'pointer'}
                  size="md"
                  ref={progressBarRef}
                  value={
                    duration
                      ? (Math.round(seek) * 100) / duration
                      : (Math.round(seek) * 100) / 180
                  }
                  onClick={handleBarChange}
                  borderRadius={'8px'}
                />
              </Stack>
              <Text textAlign={'center'}>
                {formatTime(Math.round(duration!))}
              </Text>
            </HStack>
          </VStack>

          <HStack
            flex={1}
            alignItems={'center'}
            justifyContent={'flex-end'}
            gap={sliderValue === 0 ? '30px' : '20px'}
          >
            <HStack gap={'40px'}>
              <Icon
                boxSize={'40px'}
                cursor={'pointer'}
                color={'#8d8d8d'}
                as={!queueView ? MdOutlineQueueMusic : MdOutlinePlaylistPlay}
                _hover={{
                  color: '#ffffff',
                }}
                onClick={() => {
                  setQueueView(!queueView);
                }}
              />
              <Image
                src={sliderValue === 0 ? 'volume-mute.png' : '/volume.png'}
                boxSize={sliderValue === 0 ? '24px' : '30px'}
              />
            </HStack>

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
