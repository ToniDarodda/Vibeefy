import { useEffect, useRef } from 'react';
import { MdLibraryMusic } from 'react-icons/md';
import { VStack, HStack, Text, Icon } from '@chakra-ui/react';

import {
  AlbumInterface,
  BasePlaylistInterface,
  PlaylistType,
} from '../../../interfaces';
import { ModalPlaylistOption } from '../Modal/playlistOption';

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
    <HStack
      h={'560px'}
      w={'260px'}
      flexWrap={'wrap'}
      justifyContent={'space-around'}
      ref={modalRef}
    >
      {playlists?.map((playlist: PlaylistType, idx: number) => {
        return (
          <VStack
            key={idx}
            w={'40%'}
            h={'100px'}
            cursor={'pointer'}
            borderRadius={'4px'}
            justifyContent={'center'}
            _hover={{
              backgroundColor: '#161616',
            }}
            onContextMenu={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setMouseCoord({
                clientX: e.clientX,
                clientY: e.clientY,
              });

              setModalPlaylistOptionOpen(true);
            }}
            onClick={() => {
              setSelectedAlbumOrSong(playlist);
              setPlaylistView(true);
            }}
          >
            <Icon as={MdLibraryMusic} color={'#535353'} boxSize={'60px'} />
            <Text color={'#adadad'}>{playlist.name}</Text>
            <ModalPlaylistOption
              setMouseCoord={setMouseCoord}
              isModalPlaylistOptionOpen={isModalPlaylistOptionOpen}
              mooseCoord={mooseCoord}
            />
          </VStack>
        );
      })}
    </HStack>
  );
}
