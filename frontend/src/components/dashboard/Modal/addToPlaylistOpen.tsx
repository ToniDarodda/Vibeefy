import { useEffect, useRef, useState } from 'react';
import { VStack, Text, HStack, Icon } from '@chakra-ui/react';
import { UseMutateFunction } from '@tanstack/react-query';

import { useAudioPlayerContext } from '../../../contexts';
import {
  SongInterface,
  PlaylistSong,
  PlaylistType,
  BasePlaylistInterface,
} from '../../../interfaces';
import { MdAddToQueue } from 'react-icons/md';

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
              h={'90px'}
              padding={'12px'}
              backgroundColor={'#121212'}
              border={'1px solid #82828267'}
              justifyContent={'center'}
              alignContent={'center'}
              borderRadius={'8px'}
              cursor={'pointer'}
              gap={'20px'}
            >
              <Text
                onClick={handleClickPlaylist}
                color={'#ffffff9c'}
                _hover={{
                  textColor: '#ffffff',
                }}
              >
                Add to existing playlist
              </Text>
              <Text
                color={'#ffffff9c'}
                _hover={{
                  textColor: '#ffffff',
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
              h={'200px'}
              padding={'12px'}
              overflow={'scroll'}
              backgroundColor={'#121212'}
              border={'1px solid #82828267'}
              borderRadius={'8px'}
              gap={'12px'}
              cursor={'pointer'}
              ref={modalRef}
            >
              {playlists?.map((playlist: BasePlaylistInterface) => {
                return (
                  <HStack
                    alignItems={'center'}
                    w={'100%'}
                    justifyContent={'space-evenly'}
                  >
                    <Icon
                      as={MdAddToQueue}
                      color={'#c8c8c89c'}
                      boxSize={'20px'}
                    />

                    <Text
                      w={'100px'}
                      _hover={{
                        textColor: '#a6a4a4',
                      }}
                      onClick={() => handleAddSongToPlaylist(playlist.id)}
                    >
                      {playlist.name}
                    </Text>
                  </HStack>
                );
              })}
            </VStack>
          )}
        </VStack>
      )}
    </>
  );
}
