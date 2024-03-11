import { VStack, HStack, Text, Icon } from '@chakra-ui/react';
import {
  AlbumInterface,
  BasePlaylistInterface,
  PlaylistType,
} from '../../../interfaces';
import { ModalPlaylistOption } from '../Modal/playlistOption';
import { MdLibraryMusic } from 'react-icons/md';
import { useEffect, useRef } from 'react';

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
            w={'40%'}
            h={'100px'}
            key={idx}
            backgroundColor={'#161616'}
            borderRadius={'4px'}
            cursor={'pointer'}
            justifyContent={'center'}
            _hover={{
              backgroundColor: '#2d2d2d',
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
            <Icon as={MdLibraryMusic} color={'#9d9d9d'} boxSize={'60px'}></Icon>
            <Text>{playlist.name}</Text>
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
