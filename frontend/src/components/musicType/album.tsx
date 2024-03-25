import { HStack, VStack, Image, Text } from '@chakra-ui/react';

import { GetMusicType, useSearchProvider } from '../../contexts/search.context';
import { MakePictureLargerWithImageLink, truncateText } from '../../utils';
import { useGetAlbum } from '../../query';
import { NoDataSearch } from '../search/noDataSearch';
import { useNavigate } from 'react-router-dom';

export function MusicTypeAlbum() {
  const navigate = useNavigate();

  const { musicType, search } = useSearchProvider();

  const { data: albums } = useGetAlbum(search, 30, 0);

  const handleRedirectAlbum = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  return (
    <>
      {albums && albums.length > 0 && musicType === GetMusicType.ALBUMS ? (
        <HStack
          w={'100%'}
          h={'100%'}
          flexWrap={'wrap'}
          alignItems={'flex-start'}
        >
          {albums?.map((album, index) => {
            return (
              <VStack
                key={index}
                padding={'16px'}
                cursor={'pointer'}
                borderRadius={'4px'}
                maxW={'216px'}
                alignItems={'flex-start'}
                _hover={{
                  backgroundColor: '#1a1a1a',
                }}
                onClick={() => handleRedirectAlbum(album.id)}
              >
                <Image
                  src={MakePictureLargerWithImageLink(album.thumbnails)}
                  boxSize={'180px'}
                  borderRadius={'4px'}
                  objectFit={'cover'}
                />
                <Text>{truncateText(album.title, 16)}</Text>
                <Text color={'#a7a7a7'}>
                  {album.year} - {album.artist.name}
                </Text>
              </VStack>
            );
          })}
        </HStack>
      ) : (
        <NoDataSearch data={albums} />
      )}
    </>
  );
}
