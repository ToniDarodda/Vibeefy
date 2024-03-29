import { useState } from 'react';
import {
  HStack,
  VStack,
  Text,
  Image,
  Icon,
  Spinner,
  useMediaQuery,
} from '@chakra-ui/react';
import { FaCirclePlay, FaCirclePause } from 'react-icons/fa6';
import { MdOutlineOpenInFull, MdOutlineSkipNext } from 'react-icons/md';

import { useAudioPlayerContext } from '../../contexts';
import { useGetAlbum } from '../../query';
import { truncateText } from '../../utils/truncatText';
import {
  useCreateLovedSong,
  useDeleteLovedSong,
  useGetLovedSong,
} from '../../query/lovedSong';

export function PlaybarMobile() {
  const [likedSong, setLikedSong] = useState<boolean>(false);
  const {
    togglePlayPause,
    currentSong,
    playNext,
    isPaused,
    setIsPaused,
    isListening,
    isFinish,
    isPlaying,
    setIsFullScreen,
    isFullScreen,
  } = useAudioPlayerContext();

  const [isLargardThan1000] = useMediaQuery('(min-width: 1000px)');

  const { data: albums } = useGetAlbum(currentSong?.albumName ?? 'NA', 1, 0);
  const { mutate: addLovedSong } = useCreateLovedSong();
  const { mutate: deleteLovedSong } = useDeleteLovedSong();
  const { data: lovedSongs } = useGetLovedSong();

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
    return lovedSongs?.some((lsts) => lsts.songId === currentSong?.id);
  };

  return (
    <>
      {!isLargardThan1000 && (
        <>
          {isListening && (
            <HStack
              background={`linear-gradient(190deg, #191919 0%, #131313 100%)`}
              borderRadius={'8px'}
              h={'100%'}
              w={'100%'}
              padding={'8px'}
              overflow={'hidden'}
            >
              <Image
                src={currentSong?.thumbnails ?? '/vinyl.png'}
                borderRadius={'4px'}
                boxSize={'50px'}
              />
              <VStack alignItems={'flex-start'} gap={'4px'} marginRight={'8px'}>
                <Text>{truncateText(currentSong?.title ?? '', 13)}</Text>
                <Text color={'#ffffff8a'} fontSize={'12px'}>
                  {albums ? truncateText(albums[0]?.title ?? '', 12) : ''}
                </Text>
              </VStack>
              <Image
                src={isTheSongLiked() ? '/heart.png' : '/like.png'}
                boxSize={'16px'}
                cursor={'pointer'}
                onClick={handleLovedSong}
              />
              <HStack
                alignItems={'center'}
                flex={1}
                justifyContent={'flex-end'}
                gap={'12px'}
              >
                {!isPlaying && !isPaused && !isFinish && (
                  <Spinner boxSize={'38px'} color="#ffffff" />
                )}
                {(isPlaying || isPaused || isFinish) && (
                  <Icon
                    as={!isPlaying ? FaCirclePlay : FaCirclePause}
                    cursor={'pointer'}
                    boxSize={'30px'}
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
                  boxSize={'26px'}
                  onClick={playNext}
                  color={'#8b8b8b'}
                  _hover={{
                    color: '#ffffff',
                  }}
                />
                <Icon
                  boxSize={'20px'}
                  cursor={'pointer'}
                  color={'#8d8d8d'}
                  as={MdOutlineOpenInFull}
                  onClick={() => setIsFullScreen(!isFullScreen)}
                />
              </HStack>
            </HStack>
          )}
          <HStack
            w={'100%'}
            minH={'48px'}
            borderRadius={'8px'}
            justifyContent={'space-evenly'}
            gap={'50px'}
            alignItems={'center'}
            padding={'12px'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #191919  "
          >
            <Image src="/home.png" boxSize={'20px'} />
            <Image src="/loop.png" boxSize={'20px'} />
            <Image src="/pl.png" boxSize={'20px'} />
          </HStack>
        </>
      )}
    </>
  );
}
