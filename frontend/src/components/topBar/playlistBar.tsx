import { HStack, Image, Text, Icon, VStack } from '@chakra-ui/react';

import { BasePlaylistInterface } from '../../interfaces';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { truncateText } from '../../utils/truncatText';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { albumService } from '../../services';

interface ReducedAlbumBarInterface {
  playlist: BasePlaylistInterface;
}

export function PlaylistBar({ playlist }: ReducedAlbumBarInterface) {
  const navigate = useNavigate();

  const [image, setImage] = useState<string>('/vinyl.png');

  const handleNavigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const resolvePlaylistImage = async () => {
      if (
        playlist &&
        playlist.playlistSongs &&
        playlist.playlistSongs.length > 0
      ) {
        const songId = playlist?.playlistSongs[0].songId;
        const album = await albumService.getAlbumBySongId(songId!);
        setImage(album.thumbnails);
      } else {
        setImage('/vinyl.png');
      }
    };
    resolvePlaylistImage();
  }, [playlist]);

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
            src={image}
            boxSize={{ base: '100px', sm: '120px', md: '150px' }}
            borderRadius={'8px'}
          />
          <VStack
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            h={'100%'}
          >
            <Text>{truncateText('Playlist', 25)}</Text>
            <Text fontSize={{ base: '30px', sm: '40px', md: '60px' }}>
              {truncateText(playlist?.name ?? '', 25)}
            </Text>
            <Text color={'#ffffff7d'} h={'100%'} cursor={'pointer'}>
              By Me
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
