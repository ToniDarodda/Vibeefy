import { HStack, Tooltip, Image, Text } from '@chakra-ui/react';

import { AlbumInterface, BasePlaylistInterface } from '../../../interfaces';

interface ReducedAlbumBarViewInterface {
  selectedAlbumOrSong: AlbumInterface | BasePlaylistInterface | undefined;
  setPlaylistView: (tmp: boolean) => void;
  isAlbumInterface: (object: any) => object is AlbumInterface;
}

export function ReducedAlbumBarView({
  isAlbumInterface,
  selectedAlbumOrSong,
  setPlaylistView,
}: ReducedAlbumBarViewInterface) {
  return (
    <HStack gap={'20px'} justifyContent={'center'} alignItems={'center'}>
      <Tooltip label="Go back">
        <Image
          src="/next2.png"
          transform="rotate(180deg)"
          boxSize={'20px'}
          onClick={() => setPlaylistView(false)}
        />
      </Tooltip>
      <Image
        src="/next2.png"
        boxSize={'20px'}
        onClick={() => setPlaylistView(false)}
      />
      <Image
        src={
          isAlbumInterface(selectedAlbumOrSong)
            ? selectedAlbumOrSong?.thumbnails
            : ''
        }
        boxSize={'60px'}
        borderRadius={'8px'}
      />
      <Text fontSize={'40px'} color={'#ffffffb7'}>
        {isAlbumInterface(selectedAlbumOrSong)
          ? selectedAlbumOrSong?.title
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
