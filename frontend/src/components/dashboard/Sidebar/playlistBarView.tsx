import { VStack, HStack, Text, Image } from '@chakra-ui/react';
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
  return (
    <>
      {playlists?.map((playlist: PlaylistType, idx: number) => {
        return (
          <VStack key={idx} w={'100%'}>
            <HStack
              w={'100%'}
              alignItems={'center'}
              justifyContent={'flex-start'}
              gap={'40px'}
              onClick={() => {
                setSelectedAlbumOrSong(playlist);
                setPlaylistView(true);
              }}
            >
              <VStack
                w={'60px'}
                h={'60px'}
                justifyContent={'center'}
                backgroundColor={'#0000003e'}
                borderRadius={'8px'}
              >
                <Image src="/vinyl.png" boxSize={'50px'}></Image>
              </VStack>
              <Text
                key={idx}
                cursor={'pointer'}
                onContextMenu={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setMouseCoord({
                    clientX: e.clientX,
                    clientY: e.clientY,
                  });

                  setModalPlaylistOptionOpen(true);
                }}
                fontSize={'14px'}
              >
                {playlist.name}
              </Text>
              <ModalPlaylistOption
                isModalPlaylistOptionOpen={isModalPlaylistOptionOpen}
                mooseCoord={mooseCoord}
              />
            </HStack>
          </VStack>
        );
      })}
    </>
  );
}
