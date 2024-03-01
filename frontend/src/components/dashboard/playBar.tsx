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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { formatTime } from '../../utils/formatTime';
import { SearchResponse } from '../../interfaces/search';
import { PlaybarMobile } from './playBarMobile';

interface PlaybarInterface {
  seek: number;
  duration: number;
  thumbnail: string;
  isListening: boolean;
  listeningSong: string;
  listeningImage?: string;
  isLargerThan1000: boolean;
  togglePlayPause: () => void;
  setLink: (s: string) => void;
  setTime: (x: number) => void;
  setVolume: (b: number) => void;
  setIsSearching: (x: boolean) => void;
  setSongPlaying: (s: string) => void;
  searchValue: SearchResponse[] | undefined;
}

export function Playbar({
  seek,
  setTime,
  setLink,
  duration,
  setVolume,
  thumbnail,
  searchValue,
  isListening,
  listeningSong,
  setIsSearching,
  setSongPlaying,
  togglePlayPause,
  isLargerThan1000,
}: PlaybarInterface) {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(30);

  const handleBarChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const progressBar = document.querySelector('.css-1u9udmx');
    const computedStyle = window.getComputedStyle(progressBar!);
    const widthComputed = computedStyle.width.split('px')[0];
    const result =
      ((e.clientX - (window.innerWidth - +widthComputed) / 2) * 100) /
      +widthComputed;
    setTime((result / 100) * duration);
  };

  const handleNextPrev = () => {
    const nextRandomMusic = Math.floor(Math.random() * 20);
    if (searchValue![nextRandomMusic].title !== listeningSong) {
      setLink(searchValue![nextRandomMusic].link);
      setSongPlaying(searchValue![nextRandomMusic].title);
    } else {
      handleNextPrev();
    }
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
            <Image src={thumbnail} boxSize={'60px'} />
            <VStack alignItems={'flex-start'}>
              <Text color={'#ffffff'}>{listeningSong}</Text>
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
                onClick={handleNextPrev}
              />
              <Image
                src={isPaused ? 'pause2.png' : '/pause.png'}
                cursor={'pointer'}
                boxSize={'38px'}
                onClick={() => {
                  togglePlayPause();
                  setIsPaused(!isPaused);
                }}
              />
              <Image
                src="/nextr.png"
                cursor={'pointer'}
                boxSize={'20px'}
                onClick={handleNextPrev}
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
                  colorScheme="orange"
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
                {formatTime(Math.round(duration))}
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
        thumbnail={thumbnail}
        isPaused={isPaused}
        listeningSong={listeningSong}
        isLargerThan1000={isLargerThan1000}
        handleNextPrev={handleNextPrev}
        togglePlayPause={togglePlayPause}
        setIsPaused={setIsPaused}
        setIsSearching={setIsSearching}
      ></PlaybarMobile>
    </>
  );
}
