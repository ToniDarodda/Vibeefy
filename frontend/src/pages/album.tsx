import { useEffect, useState } from 'react';
import { VStack, Text, Image, HStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { AlbumView } from '../components/view/albumView';
import { useAudioPlayerContext } from '../contexts';
import { useGetAlbumById } from '../query';
import { selectColor } from '../utils/playlistOrAlbum';
import { AlbumBar } from '../components/topBar/albumBar';
import { ReducedAlbumBar } from '../components/topBar/reduced/rAlbumBar';
import { ModalAddPlaylistOpen } from '../components/modal/addToPlaylistOpen';
import { SongInterface } from '../interfaces';

export function Album() {
  const { albumId } = useParams();

  const [reducedView, setReducedView] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [clickedSong, setClickedSong] = useState<SongInterface>();

  const [isModalAddPlaylistQueueOpen, setIsModalAddPlaylistQueueOpen] =
    useState<boolean>(false);

  const [backgroundColor, setBackgroundColor] = useState<string>('#191919');
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const { setCurrentSong, setIsListening } = useAudioPlayerContext();

  const { data: album } = useGetAlbumById(albumId ?? '');

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    const scrollDelta = 200;

    if (scrollTop > lastScrollTop && scrollTop > scrollDelta) {
      setReducedView(true);
    }

    if (scrollTop === 0) {
      setReducedView(false);
    }

    setLastScrollTop(scrollTop);
  };

  useEffect(() => {
    selectColor(album?.thumbnails ?? '', setBackgroundColor);
  }, [albumId, album]);

  return (
    <VStack w={'100%'} h={'100%'} backgroundColor={'#121212'}>
      <HStack
        w={'100%'}
        padding={reducedView ? '12px' : '24px'}
        alignItems={reducedView ? 'center' : 'flex-start'}
        borderBottom={'1px solid #3d3d3d'}
        background={`linear-gradient(190deg, ${backgroundColor} 0%, #131313 100%)`}
        height={reducedView ? '80px' : '260px'}
        transition="0.3s ease-out"
      >
        {reducedView && <ReducedAlbumBar selectedAlbumOrSong={album} />}
        {!reducedView && <AlbumBar album={album!} />}
      </HStack>

      <VStack
        flex={1}
        w={'100%'}
        overflow={'scroll'}
        alignItems={'flex-start'}
        onScroll={handleScroll}
        transition="flex 0.5s ease-out"
        padding={'12px'}
      >
        <HStack w={'95%'} justifyContent={'flex-start'} padding={'12px'}>
          <HStack gap={'20px'} w={'100%'}>
            <Text color={'#a3a3a3'}>#</Text>
            <Text color={'#a3a3a3'}>Title</Text>
          </HStack>
          <HStack justifyContent={'flex-end'}>
            <Image src="/clock.png" boxSize={'20px'} />
          </HStack>
        </HStack>
        <HStack borderBottom={'1px solid #ffffff34'} h={'1px'} w={'100%'} />
        {isModalAddPlaylistQueueOpen && (
          <ModalAddPlaylistOpen
            setIsModalAddPlaylistOpen={setIsModalAddPlaylistQueueOpen}
            isModalAddPlaylistOpen={isModalAddPlaylistQueueOpen}
            clickedSong={clickedSong}
          />
        )}
        <AlbumView
          album={album!}
          setHoveredIndex={setHoveredIndex}
          setIsListening={setIsListening}
          setCurrentSong={setCurrentSong}
          setClickedSong={setClickedSong}
          setIsModalAddPlaylistQueueOpen={setIsModalAddPlaylistQueueOpen}
          hoveredIndex={hoveredIndex}
        />
      </VStack>
    </VStack>
  );
}
