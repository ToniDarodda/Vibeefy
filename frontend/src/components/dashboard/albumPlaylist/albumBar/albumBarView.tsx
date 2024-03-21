import { AlbumInterface, BasePlaylistInterface } from '../../../../interfaces';

export interface AlbumBarViewInterface {
  selectedAlbumOrSong: AlbumInterface | BasePlaylistInterface | undefined;

  isAlbumInterface: (object: any) => object is AlbumInterface;
}

import { VStack, HStack, Text, Image, Icon } from '@chakra-ui/react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { truncateText } from '../../../../utils/truncatText';
import {
  ViewStateEnum,
  useViewStateContext,
} from '../../../../contexts/viewState.context';

export function AlbumBarView({
  isAlbumInterface,
  selectedAlbumOrSong,
}: AlbumBarViewInterface) {
  const { setViewState } = useViewStateContext();

  return (
    <VStack
      h={'100%'}
      alignItems={'flex-start'}
      justifyContent={'space-between'}
      gap={'30px'}
    >
      <HStack>
        <Icon
          as={MdKeyboardArrowLeft}
          color={'#ffffff'}
          boxSize={'34px'}
          onClick={() => setViewState(ViewStateEnum.SEARCH)}
        />
        <Icon
          as={MdKeyboardArrowRight}
          color={'#959595'}
          boxSize={'34px'}
          onClick={() => setViewState(ViewStateEnum.SELECTEDARTIST)}
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
                ? truncateText(selectedAlbumOrSong?.title, 25)
                : truncateText(selectedAlbumOrSong?.name ?? '', 25)}
            </Text>
            <Text
              color={'#ffffff7d'}
              h={'100%'}
              cursor={'pointer'}
              _hover={{
                color: '#ffffff',
              }}
              onClick={() => {
                setViewState(ViewStateEnum.SELECTEDARTIST);
              }}
            >
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
