import { VStack, HStack, Text, Image, Icon } from '@chakra-ui/react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { AlbumInterface } from '../../../interfaces';
import { truncateText } from '../../../utils/truncatText';
import { useNavigate } from 'react-router-dom';

export interface AlbumBarInterface {
  album: AlbumInterface;
}
export function AlbumBar({ album }: AlbumBarInterface) {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <VStack h={'100%'} alignItems={'flex-start'} gap={'30px'}>
      <HStack>
        <Icon
          as={MdKeyboardArrowLeft}
          cursor={'pointer'}
          color={'#ffffff'}
          boxSize={'34px'}
          onClick={handleNavigateBack}
        />
        <Icon as={MdKeyboardArrowRight} color={'#959595'} boxSize={'34px'} />
      </HStack>
      <VStack flex={1}>
        <HStack justifyContent={'center'} alignItems={'center'} gap={'20px'}>
          <Image
            src={album?.thumbnails ?? '/vinyl.png'}
            boxSize={{ base: '100px', sm: '120px', md: '150px' }}
            borderRadius={'8px'}
          />
          <VStack
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            h={'100%'}
          >
            <Text fontSize={{ base: '30px', sm: '40px', md: '60px' }}>
              {truncateText(album?.title ?? '', 25)}
            </Text>
            <Text
              color={'#ffffff7d'}
              h={'100%'}
              cursor={'pointer'}
              _hover={{
                color: '#ffffff',
              }}
              onClick={() => {}}
            >
              {album?.artist.name ?? ''}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
