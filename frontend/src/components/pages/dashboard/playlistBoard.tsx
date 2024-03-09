/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { VStack, Text, Image, HStack } from '@chakra-ui/react';

import { ModalAddPlaylistOpen } from './modal/addToPlaylistOpen';
import { AlbumView } from './view/albumView';
import { PlaylistView } from './view/playlistView';
import { ReducedAlbumBarView } from './rView/reducedAlbumBarView';
import { AlbumBarView } from './view/albumBarView';

import { useAudioPlayerContext } from '../../../contexts';
import {
  SearchResponse,
  PlaylistType,
  AlbumInterface,
  SongInterface,
} from '../../../interfaces';
import { useAddSongToPlaylist } from '../../../query';

interface PlaylistBoard {
  details: SearchResponse | null;
  playlists: PlaylistType[] | undefined;
  selectedAlbumOrSong: AlbumInterface | PlaylistType | undefined;

  setIsListening: (tmp: boolean) => void;
  setPlaylistView: (tmp: boolean) => void;
}

export function PlaylistBoard({
  details,
  playlists,
  setIsListening,
  setPlaylistView,
  selectedAlbumOrSong,
}: PlaylistBoard) {
  const [reducedView, setReducedView] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [clickedSong, setClickedSong] = useState<SongInterface>();
  const [isModalAddPlaylistQueueOpen, setIsModalAddPlaylistQueueOpen] =
    useState<boolean>(false);

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

    if (scrollTop > 0) {
      setReducedView(true);
    } else {
      setReducedView(false);
    }
  };

  return (
    <VStack w={'100%'} h={'100%'}>
      <HStack
        w={'100%'}
        padding={reducedView ? '12px' : '24px'}
        alignItems={reducedView ? 'center' : 'flex-start'}
        borderBottom={'1px solid #3d3d3d'}
        background="linear-gradient(360deg, #3d3d3d84 1%, #f0c19c 100%)"
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
        onScroll={handleScroll}
        transition="flex 0.5s ease-out"
        padding={'12px'}
      >
        <HStack
          w={'100%'}
          borderBottom={'1px solid #ffffff34'}
          justifyContent={'space-between'}
          padding={'24px'}
        >
          <Text color={'#ffffff34'}># Title</Text>
          <Image src="/clock.png" boxSize={'20px'} />
        </HStack>
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
