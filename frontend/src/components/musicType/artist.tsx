import { HStack, VStack, Image, Text } from '@chakra-ui/react';

import { GetMusicType, useSearchProvider } from '../../contexts/search.context';
import { MakePictureLargerWithImageLink } from '../../utils';
import { useGetArtistName } from '../../query';
import { useNavigate } from 'react-router-dom';

export function MusicTypeArtist() {
  const navigate = useNavigate();

  const { musicType, search } = useSearchProvider();
  const { data: artists } = useGetArtistName(search);

  const handleNavigateArtist = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <>
      {musicType === GetMusicType.ARTISTS && artists && artists?.length > 0 && (
        <HStack
          w={'100%'}
          h={'100%'}
          flexWrap={'wrap'}
          alignItems={'flex-start'}
        >
          {artists?.map((artist, index) => {
            return (
              <VStack
                key={index}
                padding={'16px'}
                cursor={'pointer'}
                borderRadius={'4px'}
                alignItems={'flex-start'}
                _hover={{
                  backgroundColor: '#1a1a1a',
                }}
                onClick={() => handleNavigateArtist(artist.id)}
              >
                <Image
                  src={MakePictureLargerWithImageLink(artist.profilePicture)}
                  boxSize={'180px'}
                  borderRadius={'100px'}
                  objectFit={'cover'}
                />
                <Text>{artist.name}</Text>
                <Text color={'#a7a7a7'}>Artist</Text>
              </VStack>
            );
          })}
        </HStack>
      )}
    </>
  );
}
