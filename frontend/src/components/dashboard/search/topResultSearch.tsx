import { VStack, Text, Image } from '@chakra-ui/react';
import { AlbumInterface } from '../../../interfaces';
import { MakePictureLarger } from '../../../utils/formatPicture';
import {
  ViewStateEnum,
  useViewStateContext,
} from '../../../contexts/viewState.context';
import { Dispatch, SetStateAction } from 'react';

interface TopResultSearchInterface {
  albums: AlbumInterface[];
  setSelectedArtist: Dispatch<SetStateAction<string>>;
}

export function TopResultSearch({
  albums,
  setSelectedArtist,
}: TopResultSearchInterface) {
  const artist = albums?.[0]?.artist ?? '';

  const { setViewState } = useViewStateContext();

  return (
    <VStack flex={1} justifyContent={'flex-start'} alignItems={'flex-start'}>
      <Text fontSize={'20px'} as={'b'}>
        Top result
      </Text>
      <VStack
        w={'100%'}
        h={'220px'}
        backgroundColor={'#161616'}
        alignItems={'flex-start'}
        padding={'24px'}
        borderRadius={'8px'}
        cursor={'pointer'}
        _hover={{
          backgroundColor: '#2d2d2d',
        }}
        onClick={() => {
          setViewState(ViewStateEnum.SELECTEDARTIST);
          setSelectedArtist(artist.id);
        }}
      >
        <Image
          src={MakePictureLarger(albums[0])}
          boxSize={'100px'}
          borderRadius={'100px'}
        />
        <Text fontSize={'24px'} as={'b'}>
          {artist.name}
        </Text>
        <Text color={'#adadad'}>Artist</Text>
      </VStack>
    </VStack>
  );
}
