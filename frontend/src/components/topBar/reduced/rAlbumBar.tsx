import { HStack, Tooltip, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { AlbumInterface, BasePlaylistInterface } from '../../../interfaces';
import { truncateText } from '../../../utils/truncatText';
import { isAlbumInterface } from '../../../utils/playlistOrAlbum';

interface ReducedAlbumBarInterface {
  selectedAlbumOrSong: AlbumInterface | BasePlaylistInterface | undefined;
}

export function ReducedAlbumBar({
  selectedAlbumOrSong,
}: ReducedAlbumBarInterface) {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <HStack
      gap={'20px'}
      h={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Tooltip label="Go back">
        <Image
          src="/next2.png"
          transform="rotate(180deg)"
          boxSize={'20px'}
          onClick={handleNavigateBack}
        />
      </Tooltip>
      <Image src="/next2.png" boxSize={'20px'} />
      <Image
        src={
          isAlbumInterface(selectedAlbumOrSong)
            ? selectedAlbumOrSong?.thumbnails
            : '/vinyl.png'
        }
        boxSize={'50px'}
        borderRadius={'8px'}
      />
      <Text
        fontSize={{ base: '16px', sm: '30px', md: '40px' }}
        color={'#ffffffb7'}
      >
        {isAlbumInterface(selectedAlbumOrSong)
          ? truncateText(selectedAlbumOrSong?.title, 18)
          : selectedAlbumOrSong?.name}
      </Text>
      <Text color={'#ffffff80'}>
        {isAlbumInterface(selectedAlbumOrSong)
          ? selectedAlbumOrSong?.artist.name
          : ''}
      </Text>
    </HStack>
  );
}
