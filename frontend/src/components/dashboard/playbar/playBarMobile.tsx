import { HStack, VStack, Text, Image, Icon, Spinner } from '@chakra-ui/react';
import { useAudioPlayerContext } from '../../../contexts';
import { useGetAlbum } from '../../../query';
import { truncateText } from '../../../utils/truncatText';
import { useState } from 'react';
import {
  useCreateLovedSong,
  useDeleteLovedSong,
  useGetLovedSong,
} from '../../../query/lovedSong';
import { LovedSong } from '../../../interfaces';
import { FaCirclePlay, FaCirclePause } from 'react-icons/fa6';
import { MdOutlineSkipNext } from 'react-icons/md';

interface PlayBarMobileInterface {
  isLargerThan1000: boolean;
}

export function PlaybarMobile({ isLargerThan1000 }: PlayBarMobileInterface) {
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
  } = useAudioPlayerContext();

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
    return lovedSongs?.some((song: LovedSong) =>
      song.lovedSongToSong.some((lsts) => lsts.songId === currentSong?.id),
    );
  };

  return (
    <>
      {!isLargerThan1000 && isListening && (
        <>
          <HStack
            position={'fixed'}
            bottom={'90px'}
            backgroundColor={'#513e21'}
            background={`linear-gradient(190deg, #191919 0%, #131313 100%)`}
            w={'calc(100% - 20px)'}
            borderRadius={'8px'}
            h={'60px'}
            padding={'12px'}
            marginBottom={'4px'}
          >
            <Image
              src={albums ? albums[0]?.thumbnails : 'vinyl.png'}
              boxSize={'50px'}
            />
            <VStack alignItems={'flex-start'} gap={'4px'} marginRight={'8px'}>
              <Text>{truncateText(currentSong?.title ?? '', 16)}</Text>
              <Text color={'#ffffff8a'}>Saison 2</Text>
            </VStack>

            <Image
              src={isTheSongLiked() ? '/heart.png' : '/like.png'}
              boxSize={'20px'}
              cursor={'pointer'}
              onClick={handleLovedSong}
            />
            <HStack
              alignItems={'center'}
              flex={1}
              justifyContent={'flex-end'}
              gap={'20px'}
            >
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
          </HStack>
          <HStack
            w={'100%'}
            h={'80px'}
            borderRadius={'8px'}
            backgroundColor={'#3d3d3d'}
            justifyContent={'space-between'}
            alignItems={'center'}
            padding={'40px'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #2B2B2B"
          >
            <Image src="/home.png" boxSize={'30px'} />
            <Image src="/loop.png" boxSize={'30px'} />
            <Image src="/pl.png" boxSize={'30px'} />
          </HStack>
        </>
      )}
    </>
  );
}
