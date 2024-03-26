import { HStack, VStack, Text, Image, useMediaQuery } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { truncateText } from '../../utils/truncatText';
import { AlbumInterface } from '../../interfaces/album';

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
        w={'100%'}
        gap={'30px'}
        flexWrap={'wrap'}
        alignItems={'flex-start'}
        padding="0px 0px 12px 0px"
        justifyContent={'flex-start'}
      >
        {albums
          .sort((a, b) => +b.year - +a.year)
          .map((album: AlbumInterface, index: number) => {
            return (
              <VStack
                key={index}
                padding={'12px'}
                cursor={'pointer'}
                borderRadius={'4px'}
                alignItems={'flex-start'}
                _hover={{
                  backgroundColor: '#1e1e1e',
                }}
                justifyContent={'space-between'}
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
                  maxW={{
                    base: '100px',
                    sm: '120px',
                    md: '200px',
                  }}
                  overflow={'hidden'}
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
