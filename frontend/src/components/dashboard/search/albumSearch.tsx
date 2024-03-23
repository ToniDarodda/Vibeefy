import { HStack, VStack, Text, Image, useMediaQuery } from '@chakra-ui/react';

import { AlbumInterface, BasePlaylistInterface } from '../../../interfaces';
import { truncateText } from '../../../utils/truncatText';
import {
  ViewStateEnum,
  useViewStateContext,
} from '../../../contexts/viewState.context';

interface AlbumSearchInterface {
  albums: AlbumInterface[];

  setSelectedAlbumOrSong: (
    value: React.SetStateAction<
      AlbumInterface | BasePlaylistInterface | undefined
    >,
  ) => void;
}

export function AlbumSearch({
  albums,
  setSelectedAlbumOrSong,
}: AlbumSearchInterface) {
  const { setViewState } = useViewStateContext();

  const [isLargardThan800] = useMediaQuery('(min-width: 800px)');

  return (
    <>
      <Text alignSelf={'flex-start'} fontSize={'20px'} as={'b'}>
        Albums
      </Text>
      <HStack
        w={'100%'}
        overflow={'scroll'}
        gap={'40px'}
        padding={'0px 0px 12px 0px'}
      >
        {albums
          .sort((a, b) => +b.year - +a.year)
          .map((album: AlbumInterface, index: number) => {
            return (
              <VStack
                w={'auto'}
                key={index}
                cursor={'pointer'}
                justifyContent={'space-between'}
                _hover={{
                  backgroundColor: '#1e1e1e',
                }}
                padding={'12px'}
                borderRadius={'4px'}
                alignItems={'flex-start'}
                onClick={() => {
                  setSelectedAlbumOrSong(album);
                  setViewState(ViewStateEnum.ALBUM);
                }}
              >
                <Image
                  src={album.thumbnails}
                  boxSize={{
                    base: '100px',
                    sm: '120px',
                    md: '200px',
                  }}
                  minW={{
                    base: '100px',
                    sm: '120px',
                    md: '200px',
                  }}
                  objectFit="cover"
                />
                <Text
                  overflow={'hidden'}
                  maxW={{
                    base: '100px',
                    sm: '120px',
                    md: '200px',
                  }}
                >
                  {truncateText(
                    album.title.split('(')[0],
                    isLargardThan800 ? 20 : 10,
                  )}
                </Text>
                <Text color={'#ababab'}>{album.artist.name}</Text>
              </VStack>
            );
          })}
      </HStack>
    </>
  );
}
