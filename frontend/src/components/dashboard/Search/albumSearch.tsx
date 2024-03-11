import { HStack, VStack, Text, Image } from '@chakra-ui/react';
import { AlbumInterface, BasePlaylistInterface } from '../../../interfaces';
import { truncateText } from '../../../utils/truncatText';

interface AlbumSearchInterface {
  albums: AlbumInterface[];

  setSelectedAlbumOrSong: (
    value: React.SetStateAction<
      AlbumInterface | BasePlaylistInterface | undefined
    >,
  ) => void;
  setPlaylistView: (b: boolean) => void;
}

export function AlbumSearch({
  albums,
  setPlaylistView,
  setSelectedAlbumOrSong,
}: AlbumSearchInterface) {
  return (
    <>
      <Text alignSelf={'flex-start'} fontSize={'20px'} as={'b'}>
        Albums
      </Text>
      <HStack w={'100%'} overflow={'scroll'} gap={'40px'}>
        {albums.map((album: AlbumInterface, index: number) => {
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
                setPlaylistView(true);
              }}
            >
              <Image
                src={album.thumbnails}
                boxSize={'200px'}
                minW={'200px'}
                objectFit="cover"
              />
              <Text overflow={'hidden'} maxW={'200px'}>
                {truncateText(album.title.split('(')[0], 20)}
              </Text>
              <Text color={'#ababab'}>{album.artist.name}</Text>
            </VStack>
          );
        })}
      </HStack>
    </>
  );
}
