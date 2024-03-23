import { useRef } from 'react';
import { VStack, HStack, Image, Text } from '@chakra-ui/react';
import { SearchBar } from '../components';
import { useGetAlbum } from '../query';
import { AlbumInterface } from '../interfaces';
import { MakePictureLarger } from '../utils/formatPicture';

export function EmptySearch() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: albums } = useGetAlbum('', 20, 0);

  return (
    <VStack h={'100%'} w={'100%'} overflow={'auto'} backgroundColor={'#121212'}>
      <SearchBar inputRef={inputRef} />
      <VStack w={'100%'} h={'100%'} gap={'20px'}>
        <HStack
          w={'100%'}
          h={'100%'}
          flexWrap={'wrap'}
          gap={'30px'}
          justifyContent={'center'}
        >
          {albums
            ?.filter(
              (album, index, self) =>
                index ===
                self.findIndex((t) => t.artist.name === album.artist.name),
            )
            .map((album: AlbumInterface, index) => {
              return (
                <VStack
                  key={index}
                  w={'auto'}
                  h={'auto'}
                  cursor={'pointer'}
                  _hover={{
                    backgroundColor: '#191919',
                  }}
                  borderRadius={'8px'}
                  padding={'12px'}
                  onClick={() => {
                    // setSelectedArtist(album.artist.id);
                    // setViewState(ViewStateEnum.SELECTEDARTIST);
                  }}
                >
                  <Image
                    src={MakePictureLarger(album)}
                    boxSize={'200px'}
                    borderRadius={'100px'}
                  />
                  <Text>{album.artist.name}</Text>
                </VStack>
              );
            })}
        </HStack>
      </VStack>
    </VStack>
  );
}
