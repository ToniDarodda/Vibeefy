/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { HStack, Text, VStack, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BasePlaylistInterface, PlaylistType } from '../../interfaces';
import { ModalPlaylistOption } from '../modal/playlistOption';
import { useAudioPlayerContext } from '../../contexts';
import { useGetLovedSong } from '../../query/lovedSong';
import { useGetAlbumBySongId } from '../../query';
import { useGetSong } from '../../query/song';

interface PlaylistBarViewInterface {
  mooseCoord: {
    clientX: number;
    clientY: number;
  };
  playlists: BasePlaylistInterface[];
  isModalPlaylistOptionOpen: boolean;

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
  isModalPlaylistOptionOpen,
  setModalPlaylistOptionOpen,
}: PlaylistBarViewInterface) {
  const navigate = useNavigate();

  const [selectedPlaylist, setSelectedPlaylist] =
    useState<BasePlaylistInterface | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const { isPlaying } = useAudioPlayerContext();

  const { data: lovedSong } = useGetLovedSong();

  const firstSongIds = playlists
    .map((playlist) => playlist.playlistSongs[0]?.songId)
    .filter(Boolean);

  const albumInfoQueries = useGetAlbumBySongId(firstSongIds);

  const handlePlaylistRedirect = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };

  const handleCollectionRedirect = () => {
    navigate('/collection/tracks');
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
      w={'100%'}
      h={isPlaying ? '580px' : '660px'}
      gap={'18px'}
      ref={modalRef}
      overflow={'scroll'}
      alignItems={'center'}
    >
      {lovedSong && lovedSong.length > 0 && (
        <HStack
          w={'100%'}
          gap={'12px'}
          padding={'4px'}
          cursor={'pointer'}
          borderRadius={'4px'}
          justifyContent={'flex-start'}
          _hover={{
            backgroundColor: '#161616',
          }}
          onClick={handleCollectionRedirect}
        >
          <Image src="/collection1.png" boxSize={'54px'} borderRadius={'4px'} />
          <VStack alignItems={'flex-start'}>
            <Text color={'#c6c6c6'} as={'b'}>
              Liked Songs
            </Text>
            <Text color={'#919191'}>Vibeefy</Text>
          </VStack>
        </HStack>
      )}
      {playlists?.map((playlist: PlaylistType, idx: number) => {
        const album = albumInfoQueries[idx]?.data;
        const thumbnailSrc = album?.thumbnails ?? '/vinyl.png';

        return (
          <HStack
            key={idx}
            w={'100%'}
            gap={'12px'}
            padding={'4px'}
            cursor={'pointer'}
            borderRadius={'4px'}
            justifyContent={'flex-start'}
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
              // setSelectedAlbumOrSong(playlist);
              handlePlaylistRedirect(playlist.id);
            }}
          >
            <Image src={thumbnailSrc} boxSize={'54px'} borderRadius={'4px'} />
            <VStack>
              <Text color={'#c6c6c6'} as={'b'}>
                {playlist.name}
              </Text>
              <Text
                fontSize={'14px'}
                color={'#919191'}
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
