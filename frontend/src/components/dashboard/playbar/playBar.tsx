/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
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
import { MdOutlineQueueMusic, MdOutlinePlaylistPlay } from 'react-icons/md';
import { FaCirclePlay } from 'react-icons/fa6';
import { FaCirclePause } from 'react-icons/fa6';
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from 'react-icons/md';

import { useAudioPlayerContext } from '../../../contexts';
import {
  AlbumInterface,
  BasePlaylistInterface,
  LovedSong,
  SearchResponse,
} from '../../../interfaces';
import { formatTime } from '../../../utils';
import { useGetAlbum, useGetAlbumBySongId } from '../../../query';
import { truncateText } from '../../../utils/truncatText';
import {
  ViewStateEnum,
  useViewStateContext,
} from '../../../contexts/viewState.context';
import { PlaybarMobile } from './playBarMobile';
import {
  useCreateLovedSong,
  useDeleteLovedSong,
  useGetLovedSong,
} from '../../../query/lovedSong';

interface PlaybarInterface {}

export function Playbar({}: PlaybarInterface) {
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
  } = useAudioPlayerContext();

  const [isLargardThan1000] = useMediaQuery('(min-width: 1000px)');

  const [sliderValue, setSliderValue] = useState<number>(30);

  const [likedSong, setLikedSong] = useState<boolean>(false);

  const progressBarRef = useRef<HTMLDivElement>(null);

  const { data: albums } = useGetAlbum(currentSong?.albumName ?? 'NA', 1, 0);

  const albumInfoQueries = useGetAlbumBySongId([currentSong?.id ?? '']);

  const [previousVolume, setPreviousVolume] = useState(sliderValue);

  const { setViewState, queueState, setQueueState } = useViewStateContext();
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

  const handleLovedSong = (e: any) => {
    if (likedSong) deleteLovedSong(currentSong?.id ?? '');
    else
      addLovedSong({
        songId: currentSong?.id ?? '',
        isPublic: false,
      });

    setLikedSong(!likedSong);
  };

  const isTheSongLiked = () => {
    return lovedSongs?.some((song: LovedSong) =>
      song.lovedSongToSong.some((lsts) => lsts.songId === currentSong?.id),
    );
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
      {isListening && isLargardThan1000 && (
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
            <VStack
              alignItems={'flex-start'}
              onClick={() => {
                // if (albumInfoQueries[0].data)
                //   setSelectedAlbumOrSong(albumInfoQueries[0].data);
                setViewState(ViewStateEnum.ALBUM);
              }}
            >
              <Text cursor={'pointer'}>
                {truncateText(currentSong?.title ?? '', 18)}
              </Text>
              <Text color={'#ffffff62'} cursor={'pointer'}>
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
          </HStack>

          <VStack flex={3} gap={'20px'}>
            <HStack gap={'20px'}>
              <Icon
                as={MdOutlineSkipPrevious}
                cursor={'pointer'}
                boxSize={'30px'}
                onClick={playPrev}
                color={'#8b8b8b'}
                _hover={{
                  color: '#ffffff',
                }}
              />
              {!isPlaying && !isPaused && !isFinish && (
                <Spinner boxSize={'38px'} color="#ffffff" />
              )}
              {(isPlaying || isPaused || isFinish) && (
                <Icon
                  as={!isPlaying ? FaCirclePlay : FaCirclePause}
                  cursor={'pointer'}
                  boxSize={'34px'}
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
                boxSize={'30px'}
                onClick={playNext}
                color={'#8b8b8b'}
                _hover={{
                  color: '#ffffff',
                }}
              />
            </HStack>
            <HStack
              w={'90%'}
              h={'5px'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={'10px'}
            >
              <Text textAlign={'center'} fontSize={'14px'}>
                {`${formatTime(Math.round(seek))}`}
              </Text>
              <Stack spacing={5} h={'4px'} w={'80%'}>
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
                      transition: 'width 1s linear', // Increased duration and changed to linear timing
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
          </VStack>

          <HStack flex={1} alignItems={'center'} justifyContent={'flex-end'}>
            <HStack w={'100%'} justifyContent={'flex-end'} gap={'12px'}>
              <HStack gap={'40px'}>
                <Icon
                  boxSize={'30px'}
                  cursor={'pointer'}
                  color={'#8d8d8d'}
                  as={!queueState ? MdOutlineQueueMusic : MdOutlinePlaylistPlay}
                  _hover={{
                    color: '#ffffff',
                  }}
                  onClick={() => {
                    setQueueState(!queueState);
                  }}
                />
                <Image
                  src={sliderValue === 0 ? 'volume-mute.png' : '/volume.png'}
                  boxSize={sliderValue === 0 ? '24px' : '26px'}
                  cursor={'pointer'}
                  onClick={handleVolumeIconClick}
                />
              </HStack>
              <Slider
                w={'50%'}
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
            </HStack>
          </HStack>
        </HStack>
      )}
      <PlaybarMobile />
    </VStack>
  );
}
