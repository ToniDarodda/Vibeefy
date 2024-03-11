import { useEffect, useRef, useState } from 'react';
import { VStack, Text } from '@chakra-ui/react';
import { UseMutateFunction } from '@tanstack/react-query';

import { useAudioPlayerContext } from '../../../contexts';
import {
  SongInterface,
  PlaylistSong,
  PlaylistType,
  BasePlaylistInterface,
} from '../../../interfaces';

interface PlaylistOpenInterface {
  isModalAddPlaylistOpen: boolean;
  clickedSong: SongInterface | undefined;
  addSong: UseMutateFunction<
    PlaylistSong,
    Error,
    {
      name: string;
      songId: string;
      playlistId: string;
      songDuration: number;
    },
    unknown
  >;
  setIsModalAddPlaylistOpen: (b: boolean) => void;
  playlists: PlaylistType[] | undefined;
  mooseCoord: { clientX: number; clientY: number };
}

export function ModalAddPlaylistOpen({
  addSong,
  playlists,
  mooseCoord,
  clickedSong,
  isModalAddPlaylistOpen,
  setIsModalAddPlaylistOpen,
}: PlaylistOpenInterface) {
  const { addToQueue } = useAudioPlayerContext();
  const [createPlaylistClicked, setCreatePlaylistCliked] =
    useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickPlaylist = () => {
    setCreatePlaylistCliked(true);
  };

  const handleClickQueue = () => {
    if (clickedSong !== undefined) {
      addToQueue(clickedSong);
    }
    setIsModalAddPlaylistOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalAddPlaylistOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddSongToPlaylist = (playlistId: string) => {
    if (clickedSong) {
      addSong({
        name: clickedSong?.title,
        songDuration: clickedSong?.songDuration,
        songId: clickedSong?.id,
        playlistId: playlistId,
      });
    }
    setIsModalAddPlaylistOpen(false);
  };

  return (
    <>
      {isModalAddPlaylistOpen && (
        <VStack
          position={'absolute'}
          top={mooseCoord.clientY}
          left={mooseCoord.clientX}
        >
          {!createPlaylistClicked && (
            <VStack
              w={'250px'}
              h={'60px'}
              padding={'12px'}
              backgroundColor={'#252525'}
              justifyContent={'center'}
              alignContent={'center'}
              borderRadius={'8px'}
              cursor={'pointer'}
            >
              <Text
                onClick={handleClickPlaylist}
                _hover={{
                  textColor: '#a6a4a4',
                }}
              >
                Add to existing playlist
              </Text>
              <Text
                _hover={{
                  textColor: '#a6a4a4',
                }}
                onClick={handleClickQueue}
              >
                Add song to queue
              </Text>
            </VStack>
          )}
          {createPlaylistClicked && (
            <VStack
              w={'250px'}
              gap={'20px'}
              h={'auto'}
              padding={'12px'}
              backgroundColor={'#252525'}
              justifyContent={'center'}
              alignContent={'center'}
              borderRadius={'8px'}
              cursor={'pointer'}
              ref={modalRef}
            >
              {playlists?.map((playlist: BasePlaylistInterface) => {
                return (
                  <Text
                    _hover={{
                      textColor: '#a6a4a4',
                    }}
                    onClick={() => handleAddSongToPlaylist(playlist.id)}
                  >
                    {playlist.name}
                  </Text>
                );
              })}
            </VStack>
          )}
        </VStack>
      )}
    </>
  );
}
