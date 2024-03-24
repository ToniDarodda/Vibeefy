import { useEffect, useRef, useState } from 'react';
import { VStack, Text, HStack, Icon, Image } from '@chakra-ui/react';
import { UseMutateFunction } from '@tanstack/react-query';
import { GoPlus } from 'react-icons/go';
import { MdOutlineQueueMusic } from 'react-icons/md';

import { useAudioPlayerContext } from '../../contexts';
import {
  SongInterface,
  PlaylistSong,
  PlaylistType,
  BasePlaylistInterface,
} from '../../interfaces';

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

  return (
    <>
      {isModalAddPlaylistOpen && (
        <VStack
          position={'absolute'}
          top={mooseCoord.clientY}
          left={mooseCoord.clientX}
          onContextMenu={(e) => e.preventDefault()}
          ref={modalRef}
        >
          {!createPlaylistClicked && (
            <VStack
              w={'250px'}
              h={'90px'}
              padding={'4px'}
              backgroundColor={'#282828'}
              justifyContent={'center'}
              alignItems={'flex-start'}
              borderRadius={'4px'}
              cursor={'pointer'}
            >
              <HStack
                w={'100%'}
                h={'40px'}
                _hover={{ backgroundColor: '#3e3d3d' }}
                cursor={'pointer'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                paddingLeft={'8px'}
              >
                <Icon
                  as={MdOutlineQueueMusic}
                  boxSize={'24px'}
                  color={'#a7a7a7'}
                />

                <Text onClick={handleClickPlaylist}>
                  Add to existing playlist
                </Text>
              </HStack>
              <HStack
                w={'100%'}
                h={'40px'}
                _hover={{ backgroundColor: '#3e3d3d' }}
                cursor={'pointer'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                paddingLeft={'8px'}
              >
                <Icon
                  as={GoPlus}
                  w={'40px'}
                  boxSize={'24px'}
                  color={'#a7a7a7'}
                />

                <Text onClick={handleClickQueue}>Add song to queue</Text>
              </HStack>
            </VStack>
          )}
          {createPlaylistClicked && (
            <VStack
              w={'250px'}
              h={'200px'}
              padding={'12px'}
              overflow={'scroll'}
              backgroundColor={'#282828'}
              borderRadius={'4px'}
              alignItems={'flex-start'}
              cursor={'pointer'}
              ref={modalRef}
            >
              <Text fontSize={'12px'}>Add to playlist</Text>
              <VStack w={'100%'} h={'1px'} borderBottom={'1px solid #3e3d3d'} />
              {playlists?.map((playlist: BasePlaylistInterface) => {
                return (
                  <HStack
                    alignItems={'center'}
                    w={'100%'}
                    padding={'8px'}
                    borderRadius={'4px'}
                    _hover={{ backgroundColor: '#1a1a1a' }}
                  >
                    <Image src="/vinyl.png" boxSize={'24px'} />

                    <Text
                      w={'100px'}
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
