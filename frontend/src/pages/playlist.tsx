import { useEffect, useState } from 'react';
import { VStack, Text, Image, HStack } from '@chakra-ui/react';
import { PlaylistView } from '../components/dashboard/view/playlistView';
import { useAudioPlayerContext } from '../contexts';
import { selectColor, isAlbumInterface } from '../utils/playlistOrAlbum';
import { useParams } from 'react-router-dom';
import { useGetPlaylistById } from '../query';
import { ReducedAlbumBar } from '../components/dashboard/topBar/reduced/rAlbumBar';
import { PlaylistBar } from '../components/dashboard/topBar/playlistBar';

export function Playlist() {
  const { playlistId } = useParams();

  const [reducedView, setReducedView] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const [backgroundColor, setBackgroundColor] = useState<string>('#191919');
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const { setCurrentSong, setIsListening } = useAudioPlayerContext();

  const { data: playlist } = useGetPlaylistById(playlistId ?? '');

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
    selectColor(playlist, setBackgroundColor);
  }, [playlist]);

  return (
    <VStack w={'100%'} h={'100%'}>
      <HStack
        w={'100%'}
        padding={reducedView ? '12px' : '24px'}
        alignItems={reducedView ? 'center' : 'flex-start'}
        borderBottom={'1px solid #3d3d3d'}
        background={`linear-gradient(190deg, ${backgroundColor} 0%, #131313 100%)`}
        height={reducedView ? '80px' : '260px'}
        transition="0.3s ease-out"
      >
        {reducedView ? (
          <ReducedAlbumBar
            selectedAlbumOrSong={playlist!}
            isAlbumInterface={isAlbumInterface}
          />
        ) : (
          <PlaylistBar playlist={playlist!} />
        )}
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

        <PlaylistView
          setIsListening={setIsListening}
          hoveredIndex={hoveredIndex}
          setCurrentSong={setCurrentSong}
          setHoveredIndex={setHoveredIndex}
          selectedAlbumOrSong={playlist!}
        />
      </VStack>
    </VStack>
  );
}
