import { HStack, Tooltip, Image, Text } from '@chakra-ui/react';

import { BasePlaylistInterface } from '../../../interfaces';

interface ReducedAlbumBarInterface {
  playlist: BasePlaylistInterface;
}

export function PlaylistBar({ playlist }: ReducedAlbumBarInterface) {
  return (
    <HStack
      gap={'20px'}
      h={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Tooltip label="Go back">
        <Image src="/next2.png" transform="rotate(180deg)" boxSize={'20px'} />
      </Tooltip>
      <Image src="/next2.png" boxSize={'20px'} />
      <Image src={'/vinyl.png'} boxSize={'50px'} borderRadius={'8px'} />
      <Text
        fontSize={{ base: '16px', sm: '30px', md: '40px' }}
        color={'#ffffffb7'}
      >
        {playlist?.name}
      </Text>
      <Text color={'#ffffff80'}></Text>
    </HStack>
  );
}
