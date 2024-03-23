import { VStack, HStack, Icon, Image, Text, Box } from '@chakra-ui/react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { ArtistInfo } from '../../interfaces';
import { ReducedArtistBar } from './reduced/rArtistBar';
import { useNavigate } from 'react-router-dom';

interface ArtistBarInterface {
  artist: ArtistInfo;
  reducedView: boolean;
}

export function ArtistBar({ artist, reducedView }: ArtistBarInterface) {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    window.history.forward();
  };

  return (
    <Box
      w={'100%'}
      h={reducedView ? `80px` : '500px'}
      position="relative"
      transition="0.4s ease-out"
    >
      {!reducedView && (
        <Image
          src={artist?.profilePicture.replaceAll('120', '1540') ?? ''}
          w={'100%'}
          h={'100%'}
          objectFit="cover"
          objectPosition="center"
        />
      )}
      <VStack
        position={reducedView ? 'initial' : 'absolute'}
        bottom="0"
        w={'100%'}
        padding={'24px'}
        height={'100%'}
        alignItems={'flex-start'}
      >
        {reducedView ? (
          <HStack w={'100%'}>
            <Icon
              as={MdKeyboardArrowLeft}
              color={'#ffffff'}
              boxSize={'34px'}
              _hover={{
                backgroundColor: '#cecece2022',
              }}
              onClick={handleNavigateBack}
            />
            <Icon
              as={MdKeyboardArrowRight}
              color={'#6b6b6b'}
              boxSize={'34px'}
              onClick={handleGoForward}
            />
            <HStack>
              <Text
                position="absolute"
                p="4"
                fontSize={{ base: '20px', md: '40px', lg: '70px', xl: '80px' }}
                as={'b'}
              >
                {artist?.name}
              </Text>
            </HStack>
          </HStack>
        ) : (
          <ReducedArtistBar artist={artist} reducedView={reducedView} />
        )}
      </VStack>
    </Box>
  );
}
