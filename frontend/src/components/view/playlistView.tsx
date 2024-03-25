import { SetStateAction, useEffect, useState } from 'react';
import { HStack, Text, Icon, VStack } from '@chakra-ui/react';

import {
  BasePlaylistInterface,
  PlaylistSong,
  SongInterface,
} from '../../interfaces';
import { formatTime } from '../../utils';
import { useGetSong } from '../../query/song';
import { useAudioPlayerContext } from '../../contexts';
import { FaPlay } from 'react-icons/fa6';
import { HiDotsHorizontal } from 'react-icons/hi';

interface PlaylistViewInterface {
  hoveredIndex: number;
  selectedAlbumOrSong: BasePlaylistInterface;

  setIsListening: (tmp: boolean) => void;
  setCurrentSong: (song: SongInterface) => void;
  setHoveredIndex: (value: SetStateAction<number>) => void;
}

export function PlaylistView({
  hoveredIndex,
  setCurrentSong,
  setIsListening,
  setHoveredIndex,
  selectedAlbumOrSong,
}: PlaylistViewInterface) {
  const [clickedSong, setClickedSong] = useState<PlaylistSong>();
  const { data } = useGetSong(clickedSong?.songId ?? '');

  const { addPlaylistToQueue } = useAudioPlayerContext();

  useEffect(() => {
    if (data) {
      setCurrentSong({
        ...data,
        albumName: selectedAlbumOrSong.name,
      });
      setIsListening(true);
    }
  }, [data]);

  return (
    <VStack w={'100%'}>
      {selectedAlbumOrSong?.playlistSongs.map((song, index) => (
        <HStack
          key={index}
          padding={'12px'}
          w={'100%'}
          justifyContent={'space-between'}
          borderRadius={'4px'}
          _hover={{ backgroundColor: '#ffffff1d' }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(-1)}
          cursor={'pointer'}
        >
          <HStack
            w={'95%'}
            onClick={() => {
              const filteredSongs = selectedAlbumOrSong.playlistSongs
                .slice(index + 1)
                .map((e) => {
                  return { ...e, playlistName: selectedAlbumOrSong.name };
                });

              addPlaylistToQueue(filteredSongs, selectedAlbumOrSong.name);
              setClickedSong(song);
            }}
          >
            <HStack justifyContent={'space-between'} w={'100%'}>
              <HStack gap={'20px'}>
                {hoveredIndex === index && (
                  <Icon as={FaPlay} boxSize={'12px'} color={'#7b7b7b'} />
                )}

                {hoveredIndex !== index && (
                  <Text color={'#6a6a6a'}>{`${index + 1}.`}</Text>
                )}
                <Text color={'#ffffffab'}>{song.songName}</Text>
              </HStack>
              <Text color={'#7b7b7b'}>{formatTime(song.songDuration)}</Text>
            </HStack>
          </HStack>
          {hoveredIndex === index && (
            <Icon
              as={HiDotsHorizontal}
              color={'#b2b2b2'}
              _hover={{
                color: '#ffffff',
              }}
              cursor={'pointer'}
            />
          )}
        </HStack>
      ))}
    </VStack>
  );
}
