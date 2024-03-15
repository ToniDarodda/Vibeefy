import { useEffect, useRef, useState } from 'react';
import { MdLibraryMusic } from 'react-icons/md';
import { HStack, Text, Icon, VStack } from '@chakra-ui/react';

import {
  AlbumInterface,
  BasePlaylistInterface,
  PlaylistType,
} from '../../../interfaces';
import { ModalPlaylistOption } from '../Modal/playlistOption';
import { useAudioPlayerContext } from '../../../contexts';

interface PlaylistBarViewInterface {
  mooseCoord: {
    clientX: number;
    clientY: number;
  };
  playlists: BasePlaylistInterface[];
  isModalPlaylistOptionOpen: boolean;

  setPlaylistView: (tmp: boolean) => void;
  setSelectedAlbumOrSong: (
    value: React.SetStateAction<
      BasePlaylistInterface | AlbumInterface | undefined
    >,
  ) => void;
  setMouseCoord: (
    value: React.SetStateAction<{
      clientX: number;
      clientY: number;
    }>,
  ) => void;
  setModalPlaylistOptionOpen: (value: React.SetStateAction<boolean>) => void;
}

export function PlaylistBarView({
  playlists,
  mooseCoord,
  setMouseCoord,
  setPlaylistView,
  setSelectedAlbumOrSong,
  isModalPlaylistOptionOpen,
  setModalPlaylistOptionOpen,
}: PlaylistBarViewInterface) {
  const [selectedPlaylist, setSelectedPlaylist] =
    useState<BasePlaylistInterface | null>(null);

  const { isPlaying } = useAudioPlayerContext();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalPlaylistOptionOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <VStack
      h={isPlaying ? '580px' : '670px'}
      overflow={'scroll'}
      w={'100%'}
      ref={modalRef}
      gap={'18px'}
      alignItems={'center'}
    >
      {playlists?.map((playlist: PlaylistType, idx: number) => {
        return (
          <HStack
            key={idx}
            w={'100%'}
            cursor={'pointer'}
            borderRadius={'4px'}
            justifyContent={'flex-start'}
            gap={'12px'}
            _hover={{
              backgroundColor: '#161616',
            }}
            onContextMenu={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setSelectedPlaylist(playlist);
              setMouseCoord({
                clientX: e.clientX,
                clientY: e.clientY,
              });

              setModalPlaylistOptionOpen(true);
            }}
            onClick={() => {
              setSelectedAlbumOrSong(playlist);
              if (!isModalPlaylistOptionOpen) setPlaylistView(true);
            }}
          >
            <Icon as={MdLibraryMusic} color={'#535353'} boxSize={'54px'} />
            <VStack>
              <Text color={'#c6c6c6'} as={'b'}>
                {playlist.name}
              </Text>
              <Text
                color={'#919191'}
                fontSize={'14px'}
                alignSelf={'flex-start'}
              >
                Me
              </Text>
            </VStack>
            <ModalPlaylistOption
              selectedPl={selectedPlaylist!}
              setMouseCoord={setMouseCoord}
              isModalPlaylistOptionOpen={isModalPlaylistOptionOpen}
              mooseCoord={mooseCoord}
            />
          </HStack>
        );
      })}
    </VStack>
  );
}
