import {
  HStack,
  Icon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Image,
} from '@chakra-ui/react';
import {
  MdOutlineQueueMusic,
  MdOutlinePlaylistPlay,
  MdOutlineOpenInFull,
} from 'react-icons/md';
import { useViewStateContext } from '../../../contexts/viewState.context';
import { useState } from 'react';
import { useAudioPlayerContext } from '../../../contexts';

interface SongSoundInterface {
  isFullScreen: boolean;
}

export function SoungSound({ isFullScreen }: SongSoundInterface) {
  const [sliderValue, setSliderValue] = useState<number>(100);

  const [previousVolume, setPreviousVolume] = useState(sliderValue);

  const { queueState, setQueueState } = useViewStateContext();

  const { setVolume, setIsFullScreen } = useAudioPlayerContext();

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

  return (
    <HStack w={'100%'} justifyContent={'flex-end'} gap={'20px'}>
      <HStack gap={'40px'}>
        {!isFullScreen && (
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
        )}
        <Image
          src={sliderValue === 0 ? 'volume-mute.png' : '/volume.png'}
          boxSize={sliderValue === 0 ? '24px' : '26px'}
          cursor={'pointer'}
          onClick={handleVolumeIconClick}
        />
      </HStack>
      <Slider
        w={isFullScreen ? '20%' : '50%'}
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
        onClick={() => {
          setIsFullScreen(!isFullScreen);
        }}
      />
    </HStack>
  );
}
