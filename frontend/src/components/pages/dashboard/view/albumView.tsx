import React from 'react';
import { HStack, Text, Image } from '@chakra-ui/react';

import { SongInterface, AlbumInterface } from '../../../../interfaces';
import { formatTime } from '../../../../utils';

interface AlbumViewInterface {
  setHoveredIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsListening: (b: boolean) => void;
  setCurrentSong: (song: SongInterface) => void;
  setMouseCoord: React.Dispatch<
    React.SetStateAction<{ clientX: number; clientY: number }>
  >;
  setClickedSong: React.Dispatch<
    React.SetStateAction<SongInterface | undefined>
  >;
  setIsModalAddPlaylistQueueOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hoveredIndex: number;
  selectedAlbumOrSong: AlbumInterface;
}

export const AlbumView: React.FC<AlbumViewInterface> = ({
  hoveredIndex,
  setCurrentSong,
  setHoveredIndex,
  setIsListening,
  setMouseCoord,
  setClickedSong,
  selectedAlbumOrSong,
  setIsModalAddPlaylistQueueOpen,
}) => {
  return (
    <>
      {selectedAlbumOrSong?.songs.map((song, songIndex) => (
        <HStack
          key={songIndex}
          padding={'12px'}
          w={'100%'}
          justifyContent={'space-between'}
          borderRadius={'4px'}
          _hover={{
            backgroundColor: '#ffffff1d',
          }}
          onMouseEnter={() => setHoveredIndex(songIndex)}
          onMouseLeave={() => setHoveredIndex(-1)}
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
            {hoveredIndex === songIndex && (
              <Image src="/pause2.png" boxSize={'12px'} />
            )}
            {hoveredIndex !== songIndex && (
              <Text color={'#6a6a6a'}>{`${songIndex + 1}.`}</Text>
            )}
            <Text color={hoveredIndex === songIndex ? '#ffffff' : '#ffffffab'}>
              {song.title}
            </Text>
          </HStack>
          <Text color={'#7b7b7b'}>{formatTime(song.songDuration)}</Text>
        </HStack>
      ))}
    </>
  );
};
