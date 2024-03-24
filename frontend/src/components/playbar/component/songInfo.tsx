import {
  HStack,
  VStack,
  Image,
  Text,
  useMediaQuery,
  Icon,
} from '@chakra-ui/react';

import { truncateText } from '../../../utils';
import { SongInterface } from '../../../interfaces';
import { useState } from 'react';
import { useCreateLovedSong, useDeleteLovedSong } from '../../../query';
import { useAudioPlayerContext } from '../../../contexts';
import { MdOutlineOpenInFull } from 'react-icons/md';

interface SongInfoInterface {
  currentSong:
    | (SongInterface & {
        link?: string | undefined;
      })
    | undefined;

  isFullScreen: boolean;

  isTheSongLiked: () => boolean | undefined;
}

export function SongInfo({
  currentSong,
  isFullScreen,
  isTheSongLiked,
}: SongInfoInterface) {
  const [likedSong, setLikedSong] = useState<boolean>(false);

  const { setIsFullScreen } = useAudioPlayerContext();

  const [isLargardThan1000] = useMediaQuery('(min-width: 1000px)');

  const { mutate: addLovedSong } = useCreateLovedSong();
  const { mutate: deleteLovedSong } = useDeleteLovedSong();

  const handleLovedSong = () => {
    if (likedSong) deleteLovedSong(currentSong?.id ?? '');
    else
      addLovedSong({
        songId: currentSong?.id ?? '',
        isPublic: false,
      });

    setLikedSong(!likedSong);
  };

  return (
    <HStack flex={1} gap={'20px'} w={isLargardThan1000 ? 'auto' : '100%'}>
      {isFullScreen ? (
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
      ) : (
        <Image src={currentSong?.thumbnails} boxSize={'60px'} />
      )}
      <VStack alignItems={'flex-start'} w={isFullScreen ? '100%' : 'auto'}>
        {isFullScreen ? (
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
        ) : (
          <Text cursor={'pointer'}>
            {truncateText(currentSong?.title ?? '', 18)}
          </Text>
        )}
        {isFullScreen ? (
          <HStack h={'100%'} w={'100%'} gap={'40px'}>
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
              {truncateText(currentSong?.albumName?.split('(')[0] ?? 'NA', 20)}
            </Text>
            <Image
              src={isTheSongLiked() ? '/heart.png' : '/like.png'}
              boxSize={'16px'}
              cursor={'pointer'}
              onClick={handleLovedSong}
            />
          </HStack>
        ) : (
          <HStack gap={'20px'}>
            <Text color={'#ffffff62'} cursor={'pointer'}>
              {truncateText(currentSong?.albumName?.split('(')[0] ?? 'NA', 20)}
            </Text>
            <Image
              src={isTheSongLiked() ? '/heart.png' : '/like.png'}
              boxSize={'16px'}
              cursor={'pointer'}
              onClick={handleLovedSong}
            />
          </HStack>
        )}
      </VStack>
      {!isLargardThan1000 && isFullScreen && (
        <Icon
          boxSize={'20px'}
          cursor={'pointer'}
          color={'#8d8d8d'}
          as={MdOutlineOpenInFull}
          onClick={() => setIsFullScreen(!isFullScreen)}
        />
      )}
    </HStack>
  );
}
