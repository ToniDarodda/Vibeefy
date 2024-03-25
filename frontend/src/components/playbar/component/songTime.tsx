import { useRef } from 'react';
import { HStack, Stack, Progress, Text } from '@chakra-ui/react';

import { formatTime } from '../../../utils';
import { useAudioPlayerContext } from '../../../contexts';

interface SongTimeInterface {
  isFullScreen: boolean;
}

export function SongTime({ isFullScreen }: SongTimeInterface) {
  const progressBarRef = useRef<HTMLDivElement>(null);

  const { seek, duration, setTime } = useAudioPlayerContext();

  const handleBarChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const widthComputed = rect.width;
    const result = ((e.clientX - rect.left) * 100) / widthComputed;

    setTime((result / 100) * duration!);
  };

  return (
    <HStack
      w={isFullScreen ? '100%' : '90%'}
      h={'5px'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'10px'}
    >
      <Text textAlign={'center'} fontSize={'14px'}>
        {`${formatTime(Math.round(seek))}`}
      </Text>
      <Stack spacing={5} h={'4px'} w={isFullScreen ? '100%' : '80%'}>
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
            '& > div:first-of-type': {
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
  );
}
