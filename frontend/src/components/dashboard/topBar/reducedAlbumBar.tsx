import { HStack, Tooltip, Image, Text } from '@chakra-ui/react';

import { AlbumInterface, BasePlaylistInterface } from '../../../interfaces';
import {
  ViewStateEnum,
  useViewStateContext,
} from '../../../contexts/viewState.context';
import { truncateText } from '../../../utils/truncatText';

interface ReducedAlbumBarInterface {
  selectedAlbumOrSong: AlbumInterface | BasePlaylistInterface | undefined;
  isAlbumInterface: (object: any) => object is AlbumInterface;
}

export function ReducedAlbumBar({
  isAlbumInterface,
  selectedAlbumOrSong,
}: ReducedAlbumBarInterface) {
  const { setViewState } = useViewStateContext();

  return (
    <HStack
      gap={'20px'}
      h={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Tooltip label="Go back">
        <Image
          src="/next2.png"
          transform="rotate(180deg)"
          boxSize={'20px'}
          onClick={() => setViewState(ViewStateEnum.SEARCH)}
        />
      </Tooltip>
      <Image
        src="/next2.png"
        boxSize={'20px'}
        onClick={() => setViewState(ViewStateEnum.ALBUM)}
      />
      <Image
        src={
          isAlbumInterface(selectedAlbumOrSong)
            ? selectedAlbumOrSong?.thumbnails
            : '/vinyl.png'
        }
        boxSize={'50px'}
        borderRadius={'8px'}
      />
      <Text
        fontSize={{ base: '16px', sm: '30px', md: '40px' }}
        color={'#ffffffb7'}
      >
        {isAlbumInterface(selectedAlbumOrSong)
          ? truncateText(selectedAlbumOrSong?.title, 18)
          : selectedAlbumOrSong?.name}
      </Text>
      <Text color={'#ffffff80'}>
        {isAlbumInterface(selectedAlbumOrSong)
          ? selectedAlbumOrSong?.artist.name
          : ''}
      </Text>
    </HStack>
  );
}
