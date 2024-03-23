import { HStack, Icon, VStack, Text } from '@chakra-ui/react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { ArtistInfo } from '../../../interfaces';

interface ReducedArtistBarInterface {
  artist: ArtistInfo;
  reducedView: boolean;
}

export function ReducedArtistBar({
  artist,
  reducedView,
}: ReducedArtistBarInterface) {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    window.history.forward();
  };

  return (
    <>
      <HStack w={'100%'}>
        <Icon
          as={MdKeyboardArrowLeft}
          color={'#ffffff'}
          boxSize={'34px'}
          backgroundColor={'#191919'}
          _hover={{
            backgroundColor: '#cecece22',
          }}
          cursor={'pointer'}
          borderRadius={'20px'}
          onClick={handleNavigateBack}
        />
        <Icon
          as={MdKeyboardArrowRight}
          color={'#6b6b6b'}
          boxSize={'34px'}
          borderRadius={'20px'}
          onClick={handleGoForward}
        />
      </HStack>
      <VStack
        w={'100%'}
        h={'100%'}
        alignItems={reducedView ? 'center' : 'flex-start'}
        justifyContent={reducedView ? 'center' : 'flex-end'}
      >
        <Text
          position="absolute"
          p="4"
          fontSize={{ base: '20px', md: '40px', lg: '70px', xl: '80px' }}
          as={'b'}
        >
          {artist?.name}
        </Text>
      </VStack>
    </>
  );
}
