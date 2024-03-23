import { VStack, Text, Image } from '@chakra-ui/react';
import { AlbumInterface } from '../../interfaces';
import { MakePictureLarger } from '../../utils/formatPicture';
import { useNavigate } from 'react-router-dom';

interface TopResultSearchInterface {
  albums: AlbumInterface[];
}

export function TopResultSearch({ albums }: TopResultSearchInterface) {
  const navigate = useNavigate();

  const artist = albums?.[0]?.artist ?? '';

  const handleNavigateArtist = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
      <Text fontSize={'20px'} as={'b'}>
        Top result
      </Text>
      <VStack
        w={'100%'}
        h={'220px'}
        padding={'24px'}
        cursor={'pointer'}
        borderRadius={'8px'}
        alignItems={'flex-start'}
        backgroundColor={'#161616'}
        _hover={{
          backgroundColor: '#2d2d2d',
        }}
        onClick={() => {
          handleNavigateArtist(artist.id);
        }}
      >
        <Image
          src={MakePictureLarger(albums[0])}
          borderRadius={'100px'}
          boxSize={{ base: '60px', sm: '80px', md: '100px' }}
        />
        <Text
          as={'b'}
          fontSize={{ base: '16px', sm: '16px', md: '20px', lg: '24px' }}
        >
          {artist.name}
        </Text>
        <Text color={'#adadad'}>Artist</Text>
      </VStack>
    </VStack>
  );
}
