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
  useMediaQuery,
} from '@chakra-ui/react';
import { FaCirclePlay, FaCirclePause } from 'react-icons/fa6';
import {
  MdOutlineSkipPrevious,
  MdOutlineSkipNext,
  MdOutlineOpenInFull,
} from 'react-icons/md';

import { useAudioPlayerContext } from '../../contexts';
import { formatTime } from '../../utils';
import { truncateText } from '../../utils/truncatText';

import { PlaybarMobile } from './playBarMobile';
import {
  useCreateLovedSong,
  useDeleteLovedSong,
  useGetLovedSong,
} from '../../query/lovedSong';

export function FullPlaybar() {
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
    isFinish,
    isListening,
    isFullScreen,
    setIsFullScreen,
  } = useAudioPlayerContext();

  const [sliderValue, setSliderValue] = useState<number>(30);

  const [likedSong, setLikedSong] = useState<boolean>(false);

  const progressBarRef = useRef<HTMLDivElement>(null);

  const [previousVolume, setPreviousVolume] = useState(sliderValue);

  const [isLargardThan1000] = useMediaQuery('(min-width: 1000px)');

  const { mutate: addLovedSong } = useCreateLovedSong();
  const { mutate: deleteLovedSong } = useDeleteLovedSong();
  const { data: lovedSongs } = useGetLovedSong();

  const handleVolumeIconClick = () => {
    if (sliderValue !== 0) {
      setPreviousVolume(sliderValue);
      setSliderValue(0);
      setVolume(0);
    } else {
      setSliderValue(previousVolume);
      setVolume(previousVolume);
    }
  };

  const handleBarChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const widthComputed = rect.width;
    const result = ((e.clientX - rect.left) * 100) / widthComputed;

    setTime((result / 100) * duration!);
  };

  const handleLovedSong = () => {
    if (likedSong) deleteLovedSong(currentSong?.id ?? '');
    else
      addLovedSong({
        songId: currentSong?.id ?? '',
        isPublic: false,
      });

    setLikedSong(!likedSong);
  };

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
                <HStack
                  gap={'20px'}
                  alignItems={'center'}
                  w={isLargardThan1000 ? '' : '100%'}
                >
                  <Image
                    src={currentSong?.thumbnails}
                    boxSize={{
                      base: '60px',
                      sm: '80px',
                      md: '100px',
                      lg: '120px',
                    }}
                    borderRadius={'8px'}
                  />
                  <VStack alignItems={'flex-start'} w={'100%'}>
                    <Text
                      cursor={'pointer'}
                      fontSize={{
                        base: '16px',
                        sm: '24px',
                        md: '26px',
                        lg: '30px',
                      }}
                    >
                      {truncateText(currentSong?.title ?? '', 18)}
                    </Text>
                    <Text
                      color={'#ffffff62'}
                      cursor={'pointer'}
                      fontSize={{
                        base: '14px',
                        sm: '14px',
                        md: '16px',
                        lg: '20px',
                      }}
                    >
                      {truncateText(
                        currentSong?.albumName?.split('(')[0] ?? 'NA',
                        20,
                      )}
                    </Text>
                  </VStack>
                  <Image
                    src={isTheSongLiked() ? '/heart.png' : '/like.png'}
                    boxSize={'16px'}
                    cursor={'pointer'}
                    onClick={handleLovedSong}
                  />
                  {!isLargardThan1000 && (
                    <Icon
                      boxSize={'20px'}
                      cursor={'pointer'}
                      color={'#8d8d8d'}
                      as={MdOutlineOpenInFull}
                      onClick={() => setIsFullScreen(!isFullScreen)}
                    />
                  )}
                </HStack>
                <HStack
                  flex={1}
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                  display={isLargardThan1000 ? 'flex' : 'none'}
                >
                  <HStack w={'100%'} justifyContent={'flex-end'} gap={'12px'}>
                    <HStack gap={'40px'}>
                      <Image
                        src={
                          sliderValue === 0 ? 'volume-mute.png' : '/volume.png'
                        }
                        boxSize={sliderValue === 0 ? '24px' : '26px'}
                        cursor={'pointer'}
                        onClick={handleVolumeIconClick}
                      />
                    </HStack>
                    <Slider
                      w={'20%'}
                      aria-label="slider-ex-1"
                      defaultValue={sliderValue}
                      value={sliderValue}
                      colorScheme="orange"
                      onChange={(e) => {
                        setVolume(e);
                        setSliderValue(e);
                      }}
                    >
                      <SliderTrack>
                        <SliderFilledTrack boxSize={'30px'} />
                      </SliderTrack>
                      <SliderThumb boxSize={'10px'} borderColor={'orange'} />
                    </Slider>
                    <Icon
                      boxSize={'20px'}
                      cursor={'pointer'}
                      color={'#8d8d8d'}
                      as={MdOutlineOpenInFull}
                      onClick={() => setIsFullScreen(!isFullScreen)}
                    />
                  </HStack>
                </HStack>
              </HStack>
              <HStack
                w={'100%'}
                h={'5px'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'10px'}
              >
                <Text textAlign={'center'} fontSize={'14px'}>
                  {`${formatTime(Math.round(seek))}`}
                </Text>
                <Stack spacing={5} h={'4px'} w={'100%'}>
                  <Progress
                    cursor={'pointer'}
                    size="md"
                    ref={progressBarRef}
                    value={
                      duration
                        ? (Math.round(seek + 1) * 100) / duration
                        : (Math.round(seek) * 100) / 180
                    }
                    sx={{
                      '& > div:first-child': {
                        transition: 'width 1s linear',
                      },
                    }}
                    onClick={handleBarChange}
                    borderRadius={'8px'}
                  />
                </Stack>
                <Text textAlign={'center'} fontSize={'14px'}>
                  {formatTime(Math.round(duration ? duration : 160))}
                </Text>
              </HStack>
              <HStack w={'100%'} justifyContent={'center'}>
                <VStack gap={'20px'} w={'100%'}>
                  <HStack gap={'20px'}>
                    <Icon
                      as={MdOutlineSkipPrevious}
                      cursor={'pointer'}
                      boxSize={'40px'}
                      onClick={playPrev}
                      color={'#8b8b8b'}
                      _hover={{
                        color: '#ffffff',
                      }}
                    />
                    {!isPlaying && !isPaused && !isFinish && (
                      <Spinner boxSize={'60px'} color="#ffffff" />
                    )}
                    {(isPlaying || isPaused || isFinish) && (
                      <Icon
                        as={!isPlaying ? FaCirclePlay : FaCirclePause}
                        cursor={'pointer'}
                        boxSize={'60px'}
                        color="#ffffff"
                        onClick={() => {
                          togglePlayPause();
                          setIsPaused(!isPaused);
                        }}
                        borderRadius={'100px'}
                        _hover={{
                          color: '#fe9333',
                          backgroundColor: '#ffffff',
                        }}
                      />
                    )}
                    <Icon
                      as={MdOutlineSkipNext}
                      cursor={'pointer'}
                      boxSize={'40px'}
                      onClick={playNext}
                      color={'#8b8b8b'}
                      _hover={{
                        color: '#ffffff',
                      }}
                    />
                  </HStack>
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
