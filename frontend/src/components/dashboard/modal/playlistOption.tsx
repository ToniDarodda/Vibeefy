import { VStack, HStack, Text, Image } from '@chakra-ui/react';

interface PlaylistOption {
  mooseCoord: { clientX: number; clientY: number };
  isModalPlaylistOptionOpen: boolean;
}

export function ModalPlaylistOption({
  isModalPlaylistOptionOpen,
  mooseCoord,
}: PlaylistOption) {
  return (
    <>
      {isModalPlaylistOptionOpen && (
        <VStack
          position={'absolute'}
          top={mooseCoord.clientY}
          left={mooseCoord.clientX}
        >
          <VStack
            backgroundColor={'#2d2d2d'}
            padding={'16px'}
            borderRadius={'8px'}
          >
            <HStack _hover={{ color: '#ffffff', cursor: 'pointer' }}>
              <Image src="/plus.png" boxSize={'12px'}></Image>
              <Text
                color={'#ffffff9c'}
                fontSize={'14px'}
                _hover={{ color: '#ffffff' }}
                onClick={() => ''}
              >
                Update playlist
              </Text>
            </HStack>
            <HStack _hover={{ color: '#ffffff', cursor: 'pointer' }}>
              <Image src="/plus.png" boxSize={'12px'}></Image>
              <Text
                color={'#ffffff9c'}
                fontSize={'14px'}
                _hover={{ color: '#ffffff' }}
                onClick={() => ''}
              >
                Delete playlist
              </Text>
            </HStack>
          </VStack>
        </VStack>
      )}
    </>
  );
}
