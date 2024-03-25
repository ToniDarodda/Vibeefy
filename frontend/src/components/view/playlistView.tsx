import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { HStack, Text, Icon, VStack, Input, Image } from '@chakra-ui/react';

import {
  BasePlaylistInterface,
  PlaylistSong,
  SongInterface,
} from '../../interfaces';
import { formatTime, truncateText } from '../../utils';
import { useGetSong, useGetSongByName } from '../../query/song';
import { useAudioPlayerContext } from '../../contexts';
import { FaPlay } from 'react-icons/fa6';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useAddSongToPlaylist } from '../../query';
import { useParams } from 'react-router-dom';

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
  const { playlistId } = useParams();

  const [inputValue, setInputValue] = useState<string>('');
  const [findMore, setFindMore] = useState<boolean>(false);
  const [clickedSong, setClickedSong] = useState<PlaylistSong>();

  const { data } = useGetSong(clickedSong?.songId ?? '');

  const { data: songs } = useGetSongByName(inputValue, 10);
  const { mutate: addSong } = useAddSongToPlaylist();

  const { addPlaylistToQueue } = useAudioPlayerContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    console.log(value);
  };

  console.log(songs);

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
      {!findMore ? (
        <VStack
          w={'100%'}
          alignItems={'flex-end'}
          padding={'20px'}
          cursor={'pointer'}
          onClick={() => setFindMore(true)}
        >
          <Text color={'#6a6a6a'}>Find More</Text>
        </VStack>
      ) : (
        <VStack w={'100%'} h={'100%'}>
          <HStack
            w={'100%'}
            padding={'20px'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <VStack
              flex={2}
              alignItems={'flex-start'}
              justifyContent={'center'}
            >
              <Text as={'b'} fontSize={'20px'}>
                Let's find something for your playlist
              </Text>
              <Input
                maxW={'80%'}
                placeholder="Search for Songs or Artists"
                color={'#ffffff'}
                onChange={handleChange}
              />
            </VStack>
            <VStack flex={2} alignItems={'flex-end'}>
              <Icon
                as={MdClose}
                boxSize={'30px'}
                color={'#6a6a6a'}
                onClick={() => setFindMore(false)}
              />
            </VStack>
          </HStack>
          <>
            {songs?.map((song, index) => {
              return (
                <HStack
                  w={'100%'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  cursor={'pointer'}
                  _hover={{
                    backgroundColor: '#1a1a1a',
                  }}
                  padding={'4px'}
                  borderRadius={'4px'}
                  gap={'20px'}
                >
                  <HStack flex={1}>
                    <Text color={'#a7a7a7'} w={'30px'}>
                      {index + 1}
                    </Text>
                    <Image
                      src={song.thumbnails}
                      boxSize={'50px'}
                      borderRadius={'4px'}
                    />
                    <VStack alignItems={'flex-start'}>
                      <Text>{truncateText(song.title, 25)}</Text>
                      <Text color={'#a7a7a7'}>{song.album.artist.name}</Text>
                    </VStack>
                  </HStack>
                  <HStack flex={1} justifyContent={'center'}>
                    <Text color={'#a7a7a7'}>{song.album.title}</Text>
                  </HStack>
                  <HStack flex={1} justifyContent={'flex-end'} padding={'12px'}>
                    <Text
                      color={'#a7a7a7'}
                      border={'1px solid #303030'}
                      textAlign={'center'}
                      padding={'8px'}
                      borderRadius={'8px'}
                      fontSize={'14px'}
                      w={'60px'}
                      _hover={{
                        border: '1px solid #ffffff',
                        color: '#ffffff',
                      }}
                      onClick={() => {
                        addSong({
                          name: song.title,
                          playlistId: playlistId ?? '',
                          songDuration: song.songDuration,
                          songId: song.id,
                        });
                      }}
                    >
                      Add
                    </Text>
                  </HStack>
                </HStack>
              );
            })}
          </>
        </VStack>
      )}
    </VStack>
  );
}
