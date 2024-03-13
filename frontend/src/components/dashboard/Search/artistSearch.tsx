import { HStack, VStack, Text, Image } from '@chakra-ui/react';
import { AlbumInterface } from '../../../interfaces';
import { MakePictureLarger } from '../../../utils/formatPicture';

interface ArtistSearchInterface {
  albums: AlbumInterface[];
}

export function ArtistSearch({ albums }: ArtistSearchInterface) {
  return (
    <>
      <Text alignSelf={'flex-start'} fontSize={'20px'} as={'b'}>
        Artists
      </Text>
      <HStack w={'100%'} overflow={'scroll'} gap={'60px'}>
        {albums
          ?.filter(
            (album, index, self) =>
              index ===
              self.findIndex((t) => t.artist.name === album.artist.name),
          )
          .map((filteredAlbum: AlbumInterface, index: number) => {
            return (
              <VStack
                w={'auto'}
                key={index}
                cursor={'pointer'}
                padding={'12px'}
                borderRadius={'4px'}
                _hover={{
                  backgroundColor: '#1e1e1e',
                }}
              >
                <Image
                  src={MakePictureLarger(filteredAlbum)}
                  boxSize={'200px'}
                  borderRadius={'100px'}
                  minW={'200px'}
                  objectFit="cover"
                />
                <Text>{filteredAlbum.artist.name}</Text>
              </VStack>
            );
          })}
      </HStack>
    </>
  );
}
