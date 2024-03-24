import { SetStateAction, useEffect, useState } from 'react';
import { HStack, Text, Icon, VStack } from '@chakra-ui/react';

import { Song, SongInterface } from '../../interfaces';
import { formatTime } from '../../utils';
import { useGetSong } from '../../query/song';
import { useAudioPlayerContext } from '../../contexts';
import { FaPlay } from 'react-icons/fa6';
import { HiDotsHorizontal } from 'react-icons/hi';

interface CollectionViewInterface {
  hoveredIndex: number;
  songs: Song[];

  setIsListening: (tmp: boolean) => void;
  setCurrentSong: (song: SongInterface) => void;
  setHoveredIndex: (value: SetStateAction<number>) => void;
}

export function CollectionView({
  songs,
  hoveredIndex,
  setCurrentSong,
  setIsListening,
  setHoveredIndex,
}: CollectionViewInterface) {
  const [clickedSong, setClickedSong] = useState<Song>();
  const { data } = useGetSong(clickedSong?.id ?? '');

  const { addPlaylistToQueue } = useAudioPlayerContext();

  useEffect(() => {
    if (data) {
      setCurrentSong({
        ...data,
        albumName: 'Loved Songs',
      });
      setIsListening(true);
    }
  }, [data]);

  return (
    <VStack w={'100%'}>
      {songs?.map((song, songIndex) => (
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

              const filteredSongs = songs.slice(songIndex + 1).map((e) => {
                return { ...e, playlistName: 'Loved Songs' };
              });

              addPlaylistToQueue(filteredSongs, 'Loved Songs');
              setClickedSong(song);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
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
            />
          )}
        </HStack>
      ))}
    </VStack>
  );
}
