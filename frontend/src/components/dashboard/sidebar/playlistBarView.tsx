import { useEffect, useRef, useState } from 'react';
import { MdLibraryMusic } from 'react-icons/md';
import { HStack, Text, Icon, VStack, Image } from '@chakra-ui/react';

import {
  AlbumInterface,
  BasePlaylistInterface,
  PlaylistType,
} from '../../../interfaces';
import { ModalPlaylistOption } from '../modal/playlistOption';
import { useAudioPlayerContext } from '../../../contexts';
import {
  ViewStateEnum,
  useViewStateContext,
} from '../../../contexts/viewState.context';
import { useGetLovedSong } from '../../../query/lovedSong';

interface PlaylistBarViewInterface {
  mooseCoord: {
    clientX: number;
    clientY: number;
  };
  playlists: BasePlaylistInterface[];
  isModalPlaylistOptionOpen: boolean;

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
  setSelectedAlbumOrSong,
  isModalPlaylistOptionOpen,
  setModalPlaylistOptionOpen,
}: PlaylistBarViewInterface) {
  const [selectedPlaylist, setSelectedPlaylist] =
    useState<BasePlaylistInterface | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const { isPlaying } = useAudioPlayerContext();

  const { setViewState } = useViewStateContext();

  const { data: lovedSong } = useGetLovedSong();

  const getThumbnailsFromFirstSong = (playlist: BasePlaylistInterface) => {
    if (playlist && playlist.playlistSongs.length > 0) {
      return playlist.playlistSongs[0].thumbnails ?? 'vinyl.png';
    }
    return 'vinyl.png';
  };

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
      h={isPlaying ? '580px' : '660px'}
      overflow={'scroll'}
      w={'100%'}
      ref={modalRef}
      gap={'18px'}
      alignItems={'center'}
    >
      {lovedSong && lovedSong.length > 0 && (
        <HStack
          w={'100%'}
          cursor={'pointer'}
          borderRadius={'4px'}
          justifyContent={'flex-start'}
          gap={'12px'}
          _hover={{
            backgroundColor: '#161616',
          }}
        >
          <Icon as={MdLibraryMusic} color={'#535353'} boxSize={'54px'} />
          <VStack>
            <Text color={'#c6c6c6'} as={'b'}>
              Liked Songs
            </Text>
          </VStack>
        </HStack>
      )}
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
              if (!isModalPlaylistOptionOpen)
                setViewState(ViewStateEnum.PLAYLIST);
            }}
          >
            <Image
              src={getThumbnailsFromFirstSong(playlist)}
              boxSize={'54px'}
            />
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
          </HStack>
        );
      })}
      <ModalPlaylistOption
        selectedPl={selectedPlaylist!}
        setMouseCoord={setMouseCoord}
        isModalPlaylistOptionOpen={isModalPlaylistOptionOpen}
        mooseCoord={mooseCoord}
      />
    </VStack>
  );
}
