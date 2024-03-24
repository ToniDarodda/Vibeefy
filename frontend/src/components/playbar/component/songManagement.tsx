import { HStack, Icon, Spinner } from '@chakra-ui/react';
import { FaCirclePlay, FaCirclePause } from 'react-icons/fa6';
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from 'react-icons/md';

import { useAudioPlayerContext } from '../../../contexts';

interface SongManagementInterface {
  isFullScreen: boolean;
}

export function SongManagement({ isFullScreen }: SongManagementInterface) {
  const {
    togglePlayPause,
    playNext,
    playPrev,
    isPlaying,
    isPaused,
    setIsPaused,
    isFinish,
  } = useAudioPlayerContext();

  return (
    <HStack gap={'20px'}>
      <Icon
        as={MdOutlineSkipPrevious}
        cursor={'pointer'}
        boxSize={isFullScreen ? '40px' : '30px'}
        onClick={playPrev}
        color={'#8b8b8b'}
        _hover={{
          color: '#ffffff',
        }}
      />
      {!isPlaying && !isPaused && !isFinish && (
        <Spinner boxSize={isFullScreen ? '60px' : '38px'} color="#ffffff" />
      )}
      {(isPlaying || isPaused || isFinish) && (
        <Icon
          as={!isPlaying ? FaCirclePlay : FaCirclePause}
          cursor={'pointer'}
          boxSize={isFullScreen ? '60px' : '34px'}
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
        boxSize={isFullScreen ? '40px' : '30px'}
        onClick={playNext}
        color={'#8b8b8b'}
        _hover={{
          color: '#ffffff',
        }}
      />
    </HStack>
  );
}
