import { SetStateAction, useEffect, useState } from 'react';
import { HStack, Text, Image } from '@chakra-ui/react';

import {
  BasePlaylistInterface,
  PlaylistSong,
  SongInterface,
} from '../../../interfaces';
import { formatTime } from '../../../utils';
import { useGetSong } from '../../../query/song';
import { useAudioPlayerContext } from '../../../contexts';

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
    <>
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
        >
          <HStack
            gap={'20px'}
            onClick={() => {
              addPlaylistToQueue(selectedAlbumOrSong.playlistSongs);
              setClickedSong(song);
            }}
          >
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
      ))}
    </>
  );
}
