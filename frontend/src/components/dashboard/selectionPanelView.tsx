/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { VStack, Text, Image, HStack } from '@chakra-ui/react';

import { ModalAddPlaylistOpen } from './Modal/addToPlaylistOpen';
import { AlbumView } from './AlbumDetails/albumView';
import { PlaylistView } from './Playlist/playlistView';
import { ReducedAlbumBarView } from './Albumbar/reducedAlbumBarView';
import { AlbumBarView } from './Albumbar/albumBarView';

import { useAudioPlayerContext } from '../../contexts';
import {
  SearchResponse,
  PlaylistType,
  AlbumInterface,
  SongInterface,
} from '../../interfaces';
import { useAddSongToPlaylist } from '../../query';
import { colorGrapper } from '../../utils/colorGrap';
import { Loading } from '../../pages';

interface ChooseBarViewInterface {
  details: SearchResponse | null;
  playlists: PlaylistType[] | undefined;
  selectedAlbumOrSong: AlbumInterface | PlaylistType | undefined;

  setIsListening: (tmp: boolean) => void;
  setPlaylistView: (tmp: boolean) => void;
}

export function SelectionPanelView({
  details,
  playlists,
  setIsListening,
  setPlaylistView,
  selectedAlbumOrSong,
}: ChooseBarViewInterface) {
  const [reducedView, setReducedView] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [clickedSong, setClickedSong] = useState<SongInterface>();
  const [isModalAddPlaylistQueueOpen, setIsModalAddPlaylistQueueOpen] =
    useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('#191919');
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const { setCurrentSong } = useAudioPlayerContext();

  const [mooseCoord, setMouseCoord] = useState<{
    clientX: number;
    clientY: number;
  }>({ clientX: 0, clientY: 0 });

  const { mutate: addSong } = useAddSongToPlaylist();

  const isAlbumInterface = (object: any): object is AlbumInterface => {
    return 'thumbnails' in object;
  };

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

  const selectColor = async () => {
    if (isAlbumInterface(selectedAlbumOrSong)) {
      const image = (selectedAlbumOrSong as AlbumInterface).thumbnails;
      colorGrapper(image)
        .then((dominantColor) => {
          const color = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
          setBackgroundColor(color);
        })
        .catch((error) => {
          console.error('Error extracting color', error);
        });
    }
  };

  useEffect(() => {
    selectColor();
  }, [selectedAlbumOrSong]);

  return (
    <VStack w={'100%'} h={'100%'}>
      <HStack
        w={'100%'}
        padding={reducedView ? '12px' : '24px'}
        alignItems={reducedView ? 'center' : 'flex-start'}
        borderBottom={'1px solid #3d3d3d'}
        background={`linear-gradient(190deg, ${backgroundColor} 0%, #131313 100%)`}
        height={reducedView ? '80px' : '260px'}
        transition="0.2s ease-out"
      >
        {reducedView && (
          <ReducedAlbumBarView
            setPlaylistView={setPlaylistView}
            isAlbumInterface={isAlbumInterface}
            selectedAlbumOrSong={selectedAlbumOrSong}
          />
        )}
        {!reducedView && (
          <AlbumBarView
            setPlaylistView={setPlaylistView}
            isAlbumInterface={isAlbumInterface}
            selectedAlbumOrSong={selectedAlbumOrSong}
          />
        )}
      </HStack>

      <VStack
        overflow={'scroll'}
        flex={1}
        w={'100%'}
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
            addSong={addSong}
            setIsModalAddPlaylistOpen={setIsModalAddPlaylistQueueOpen}
            isModalAddPlaylistOpen={isModalAddPlaylistQueueOpen}
            playlists={playlists}
            mooseCoord={mooseCoord}
            clickedSong={clickedSong}
          />
        )}
        {isAlbumInterface(selectedAlbumOrSong) ? (
          <AlbumView
            setHoveredIndex={setHoveredIndex}
            setIsListening={setIsListening}
            setCurrentSong={setCurrentSong}
            setMouseCoord={setMouseCoord}
            setClickedSong={setClickedSong}
            setIsModalAddPlaylistQueueOpen={setIsModalAddPlaylistQueueOpen}
            hoveredIndex={hoveredIndex}
            selectedAlbumOrSong={selectedAlbumOrSong}
          />
        ) : (
          <PlaylistView
            setIsListening={setIsListening}
            hoveredIndex={hoveredIndex}
            setCurrentSong={setCurrentSong}
            setHoveredIndex={setHoveredIndex}
            selectedAlbumOrSong={selectedAlbumOrSong!}
          />
        )}
      </VStack>
    </VStack>
  );
}
