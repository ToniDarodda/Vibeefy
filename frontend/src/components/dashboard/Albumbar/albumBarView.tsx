import { VStack, HStack, Tooltip, Text, Image } from '@chakra-ui/react';

import { AlbumInterface, BasePlaylistInterface } from '../../../interfaces';

interface AlbumBarViewInterface {
  selectedAlbumOrSong: AlbumInterface | BasePlaylistInterface | undefined;

  setPlaylistView: (tmp: boolean) => void;
  isAlbumInterface: (object: any) => object is AlbumInterface;
}

export function AlbumBarView({
  isAlbumInterface,
  selectedAlbumOrSong,
  setPlaylistView,
}: AlbumBarViewInterface) {
  return (
    <VStack
      h={'100%'}
      alignItems={'flex-start'}
      justifyContent={'space-between'}
      gap={'50px'}
    >
      <HStack gap={'20px'}>
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
      </HStack>
      <VStack flex={1}>
        <HStack justifyContent={'center'} alignItems={'center'} gap={'20px'}>
          <Image
            src={
              isAlbumInterface(selectedAlbumOrSong)
                ? selectedAlbumOrSong?.thumbnails
                : '/vinyl.png'
            }
            boxSize={{ base: '100px', sm: '120px', md: '150px' }}
            borderRadius={'8px'}
          />
          <VStack
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            h={'100%'}
          >
            <Text fontSize={{ base: '30px', sm: '40px', md: '60px' }}>
              {isAlbumInterface(selectedAlbumOrSong)
                ? selectedAlbumOrSong?.title
                : selectedAlbumOrSong?.name}
            </Text>
            <Text color={'#ffffff7d'} h={'100%'}>
              {isAlbumInterface(selectedAlbumOrSong)
                ? selectedAlbumOrSong?.artist.name
                : ''}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
