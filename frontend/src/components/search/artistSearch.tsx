import { HStack, VStack, Text, Image } from '@chakra-ui/react';
import { AlbumInterface } from '../../interfaces';
import { MakePictureLarger } from '../../utils/formatPicture';
import { useNavigate } from 'react-router-dom';

interface ArtistSearchInterface {
  albums: AlbumInterface[];
}

export function ArtistSearch({ albums }: ArtistSearchInterface) {
  const navigate = useNavigate();

  const handleNavigateArtist = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };
  return (
    <VStack w={'100%'} justifyContent={'flex-start'}>
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
                padding={'12px'}
                cursor={'pointer'}
                borderRadius={'4px'}
                _hover={{
                  backgroundColor: '#1e1e1e',
                }}
                onClick={() => handleNavigateArtist(filteredAlbum.artist.id)}
              >
                <Image
                  src={MakePictureLarger(filteredAlbum)}
                  boxSize={{
                    base: '100px',
                    sm: '120px',
                    md: '200px',
                  }}
                  borderRadius={'100px'}
                  minH={{ base: '100px', sm: '120px', md: '200px' }}
                  minW={{
                    base: '100px',
                    sm: '120px',
                    md: '200px',
                  }}
                  objectFit="cover"
                />
                <Text>{filteredAlbum.artist.name}</Text>
              </VStack>
            );
          })}
      </HStack>
    </VStack>
  );
}
