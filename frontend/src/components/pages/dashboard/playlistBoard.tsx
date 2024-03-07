/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { VStack, Text, Image, HStack, Tooltip } from '@chakra-ui/react';

import { AlbumInterface, SongInterface } from '../../../interfaces/artist';
import { PlaylistType } from '../../../interfaces/playlist';

import { SearchResponse } from '../../../interfaces/search';
import { formatTime } from '../../../utils/formatTime';
import { useAddSongToPlaylist } from '../../../query/playlist';
import { ModalAddPlaylistOpen } from './modal/addToPlaylistOpen';
import { useAudioPlayerContext } from '../../../contexts/playerContext';

interface PlaylistBoard {
  details: SearchResponse | null;
  playlists: PlaylistType[] | undefined;
  selectedAlbumOrSong: AlbumInterface | PlaylistType | undefined;

  setIsListening: (b: boolean) => void;
  setPlaylistView: (b: boolean) => void;
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
        background="linear-gradient(360deg, #3d3d3d81 1%, #bf731744 100%)"
        height={reducedView ? '80px' : '260px'}
        transition="0.5s ease-out"
      >
        {reducedView && (
          <HStack gap={'20px'} justifyContent={'center'} alignItems={'center'}>
            <Tooltip label="Go back">
              <Image
                src="/next2.png"
                transform="rotate(180deg)"
                boxSize={'20px'}
                onClick={() => setPlaylistView(false)}
              />
            </Tooltip>
            <Image
              src="/next2.png"
              boxSize={'20px'}
              onClick={() => setPlaylistView(false)}
            />
            <Image
              src={
                isAlbumInterface(selectedAlbumOrSong)
                  ? selectedAlbumOrSong?.thumbnails
                  : ''
              }
              boxSize={'60px'}
              borderRadius={'8px'}
            />
            <Text fontSize={'40px'} color={'#ffffffb7'}>
              {isAlbumInterface(selectedAlbumOrSong)
                ? selectedAlbumOrSong?.title
                : selectedAlbumOrSong?.name}
            </Text>
            <Text color={'#ffffff80'}>
              {isAlbumInterface(selectedAlbumOrSong)
                ? selectedAlbumOrSong?.artist.name
                : ''}
            </Text>
          </HStack>
        )}

        {!reducedView && (
          <VStack
            h={'100%'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
            gap={'50px'}
          >
            <HStack gap={'20px'}>
              <Tooltip label="Go back">
                <Image
                  src="/next2.png"
                  transform="rotate(180deg)"
                  boxSize={'20px'}
                  onClick={() => setPlaylistView(false)}
                />
              </Tooltip>
              <Image
                src="/next2.png"
                boxSize={'20px'}
                onClick={() => setPlaylistView(false)}
              />
            </HStack>
            <VStack flex={1}>
              <HStack
                justifyContent={'center'}
                alignItems={'center'}
                gap={'20px'}
              >
                <Image
                  src={
                    isAlbumInterface(selectedAlbumOrSong)
                      ? selectedAlbumOrSong?.thumbnails
                      : '/vinyl.png'
                  }
                  boxSize={{ base: '100px', sm: '120px', md: '150px' }}
                  borderRadius={'8px'}
                />
                <VStack
                  alignItems={'flex-start'}
                  justifyContent={'space-between'}
                  h={'100%'}
                >
                  <Text
                    fontSize={{ base: '30px', sm: '40px', md: '60px' }}
                    color={'#ffffff'}
                  >
                    {isAlbumInterface(selectedAlbumOrSong)
                      ? selectedAlbumOrSong?.title
                      : selectedAlbumOrSong?.name}
                  </Text>
                  <Text color={'#ffffff7d'} h={'100%'}>
                    {isAlbumInterface(selectedAlbumOrSong)
                      ? selectedAlbumOrSong?.artist.name
                      : ''}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
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
        {isAlbumInterface(selectedAlbumOrSong)
          ? selectedAlbumOrSong?.songs.map((song, index: number) => {
              return (
                <HStack
                  key={index}
                  padding={'12px'}
                  w={'100%'}
                  justifyContent={'space-between'}
                  borderRadius={'4px'}
                  _hover={{
                    backgroundColor: '#ffffff1d',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => {
                    setHoveredIndex(-1);
                  }}
                  onClick={() => {
                    setIsListening(true);
                    setCurrentSong({ ...song });
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setMouseCoord({
                      clientX: e.clientX,
                      clientY: e.clientY,
                    });
                    setClickedSong(song);

                    setIsModalAddPlaylistQueueOpen(true);
                  }}
                >
                  <HStack gap={'20px'}>
                    {hoveredIndex === index && (
                      <Image src="/pause2.png" boxSize={'12px'} />
                    )}
                    {hoveredIndex !== index && (
                      <Text color={'#6a6a6a'}>{`${index + 1}.`}</Text>
                    )}
                    <Text color={'#ffffffab'}>{song.title}</Text>
                  </HStack>
                  <Text color={'#7b7b7b'}>{formatTime(song.songDuration)}</Text>
                </HStack>
              );
            })
          : selectedAlbumOrSong?.playlistSongs.map((song, index: number) => {
              return (
                <HStack
                  key={index}
                  padding={'12px'}
                  w={'100%'}
                  justifyContent={'space-between'}
                  borderRadius={'4px'}
                  _hover={{
                    backgroundColor: '#ffffff1d',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  <HStack gap={'20px'}>
                    {hoveredIndex === index && (
                      <Image src="/pause2.png" boxSize={'12px'} />
                    )}
                    {hoveredIndex !== index && (
                      <Text color={'#6a6a6a'}>{`${index + 1}.`}</Text>
                    )}
                    <Text color={'#ffffffab'}>{song.songName}</Text>
                  </HStack>
                  <Text color={'#7b7b7b'}>{formatTime(song.songDuration)}</Text>
                </HStack>
              );
            })}
      </VStack>
    </VStack>
  );
}
