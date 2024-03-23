import { HStack, VStack, Text, Image, useMediaQuery } from '@chakra-ui/react';

import { AlbumInterface } from '../../../interfaces';
import { truncateText } from '../../../utils/truncatText';
import { useNavigate } from 'react-router-dom';

interface AlbumSearchInterface {
  albums: AlbumInterface[];
}

export function AlbumSearch({ albums }: AlbumSearchInterface) {
  const navigate = useNavigate();

  const [isLargardThan800] = useMediaQuery('(min-width: 800px)');

  const handleNavigateAlbum = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  return (
    <VStack w={'100%'}>
      <Text alignSelf={'flex-start'} fontSize={'20px'} as={'b'}>
        Albums
      </Text>
      <HStack
        w="100%" // Utilisez 100% de la largeur du parent
        maxW={'100%'}
        overflowX="auto" // Autorise le défilement horizontal si nécessaire
        overflowY="hidden" // Empêche le défilement vertical
        gap="40px" // Espace entre chaque album
        padding="0px 0px 12px 0px" // Pad
      >
        {albums
          .sort((a, b) => +b.year - +a.year)
          .map((album: AlbumInterface, index: number) => {
            return (
              <VStack
                key={index}
                cursor={'pointer'}
                justifyContent={'space-between'}
                _hover={{
                  backgroundColor: '#1e1e1e',
                }}
                padding={'12px'}
                borderRadius={'4px'}
                alignItems={'flex-start'}
                onClick={() => handleNavigateAlbum(album.id)}
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
    </VStack>
  );
}
