import React, { Dispatch, SetStateAction } from 'react';
import { HStack, Text, VStack, Icon } from '@chakra-ui/react';
import { HiDotsHorizontal } from 'react-icons/hi';

import { SongInterface, AlbumInterface } from '../../interfaces';
import { formatTime } from '../../utils';
import { useAudioPlayerContext } from '../../contexts';
import { FaPlay } from 'react-icons/fa6';

interface AlbumViewInterface {
  album: AlbumInterface;
  hoveredIndex: number;

  setHoveredIndex: Dispatch<SetStateAction<number>>;
  setIsModalAddPlaylistQueueOpen: Dispatch<SetStateAction<boolean>>;
  setMouseCoord: Dispatch<SetStateAction<{ clientX: number; clientY: number }>>;
  setIsListening: (b: boolean) => void;
  setCurrentSong: (song: SongInterface) => void;
}

export const AlbumView: React.FC<AlbumViewInterface> = ({
  album,
  hoveredIndex,

  setMouseCoord,
  setCurrentSong,
  setIsListening,
  setHoveredIndex,
  setIsModalAddPlaylistQueueOpen,
}) => {
  const { addPlaylistToQueue } = useAudioPlayerContext();

  return (
    <VStack w={'100%'}>
      {album?.songs
        .sort((a, b) => (a?.trackNumber ?? 10) - (b?.trackNumber ?? 10))
        .map((song, songIndex) => (
          <HStack
            w={'100%'}
            key={songIndex}
            borderRadius={'4px'}
            _hover={{
              backgroundColor: '#ffffff1d',
            }}
            onMouseEnter={() => setHoveredIndex(songIndex)}
            onMouseLeave={() => setHoveredIndex(-1)}
            cursor={'pointer'}
          >
            <HStack
              padding={'12px'}
              w={'95%'}
              justifyContent={'space-between'}
              onClick={() => {
                setIsListening(true);

                const filteredSongs = album.songs
                  .slice(songIndex + 1)
                  .map((e) => {
                    return { ...e, playlistName: album.title };
                  });
                addPlaylistToQueue(filteredSongs, album.title);
                setCurrentSong({
                  ...song,
                  albumName: album.title,
                });
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                setMouseCoord({
                  clientX: e.clientX,
                  clientY: e.clientY,
                });
                // setClickedSong({
                //   ...song,
                //   albumName: album.title,
                // });
                setIsModalAddPlaylistQueueOpen(true);
              }}
            >
              <HStack justifyContent={'space-between'} w={'100%'}>
                <HStack gap={'20px'}>
                  {hoveredIndex === songIndex && (
                    <Icon as={FaPlay} boxSize={'12px'} color={'#7b7b7b'} />
                  )}
                  {hoveredIndex !== songIndex && (
                    <Text color={'#6a6a6a'}>{`${songIndex + 1}.`}</Text>
                  )}
                  <Text
                    color={hoveredIndex === songIndex ? '#ffffff' : '#ffffffab'}
                  >
                    {song.title}
                  </Text>
                </HStack>
                <Text color={'#7b7b7b'}>{formatTime(song.songDuration)}</Text>
              </HStack>
            </HStack>
            {hoveredIndex === songIndex && (
              <Icon
                as={HiDotsHorizontal}
                color={'#b2b2b2'}
                _hover={{
                  color: '#ffffff',
                }}
                cursor={'pointer'}
                onClick={(e) => {
                  setMouseCoord({
                    clientX: e.clientX,
                    clientY: e.clientY,
                  });
                  setIsModalAddPlaylistQueueOpen(true);
                }}
              />
            )}
          </HStack>
        ))}
    </VStack>
  );
};
