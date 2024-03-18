import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { VStack, HStack, Text, Icon } from '@chakra-ui/react';

import { PlaylistType, AlbumInterface } from '../../../interfaces';
import { MdHome, MdSearch } from 'react-icons/md';

import { QueueView } from './queueBarView';
import { PlaylistBarView } from './playlistBarView';
import { MdQueue } from 'react-icons/md';
import { IoLibrarySharp } from 'react-icons/io5';
import { ModalPlaylistCode } from '../Modal/addPlaylistCode';
import {
  ViewStateEnum,
  useViewStateContext,
} from '../../../contexts/viewState.context';

interface PlaylistBarInterface {
  playlists: PlaylistType[] | undefined;
  inputRef: RefObject<HTMLInputElement>;

  setSearch: Dispatch<SetStateAction<string>>;
  isLargardThan1000: boolean;
  setSelectedAlbumOrSong: Dispatch<
    SetStateAction<AlbumInterface | PlaylistType | undefined>
  >;
}

export function PlaylistBar({
  inputRef,
  setSearch,
  playlists,
  isLargardThan1000,
  setSelectedAlbumOrSong,
}: PlaylistBarInterface) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isHoveredLoop, setIsHoveredLoop] = useState(false);

  const [isModalPlaylistOptionOpen, setModalPlaylistOptionOpen] =
    useState<boolean>(false);
  const [mooseCoord, setMouseCoord] = useState<{
    clientX: number;
    clientY: number;
  }>({ clientX: 0, clientY: 0 });

  const { setViewState, queueState } = useViewStateContext();

  return (
    <VStack flex={1} h={'100%'} display={isLargardThan1000 ? 'normal' : 'none'}>
      {isLargardThan1000 && (
        <VStack w={'100%'} h={'100%'} flex={1} borderRadius={'8px'}>
          <VStack
            w={'100%'}
            borderRadius={'8px'}
            backgroundColor={'#2b2b2b'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #121212"
            padding={'12px'}
            alignItems={'flex-start'}
            gap={'20px'}
          >
            <HStack
              h={'50px'}
              w={'100%'}
              gap={'20%'}
              padding={'12px'}
              cursor={'pointer'}
              borderRadius={'8px'}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                setSearch('');
                setViewState(ViewStateEnum.ARTISTS);
              }}
            >
              <Icon
                as={MdHome}
                boxSize={'30px'}
                color={isHovered ? '#ffffff' : '#535353'}
              />
              <Text fontSize={'16px'}>Home</Text>
            </HStack>
            <HStack
              w={'100%'}
              gap={'20%'}
              cursor={'pointer'}
              h={'50px'}
              padding={'12px'}
              borderRadius={'8px'}
              onMouseEnter={() => setIsHoveredLoop(true)}
              onMouseLeave={() => setIsHoveredLoop(false)}
              onClick={() => {
                setViewState(ViewStateEnum.SEARCH);
                inputRef.current?.focus();
              }}
            >
              <Icon
                as={MdSearch}
                color={isHoveredLoop ? '#ffffff' : '#535353'}
                boxSize={'32px'}
              />
              <Text fontSize={'16px'}>Search</Text>
            </HStack>
          </VStack>
          <VStack
            flex={3}
            w={'100%'}
            borderRadius={'8px'}
            backgroundColor={'#2b2b2b'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #121212"
            padding={'0px 12px 0px'}
            onContextMenu={(e) => {
              e.preventDefault();
              setModalPlaylistOptionOpen(false);
              setMouseCoord({ clientX: e.clientX, clientY: e.clientY });
            }}
            contextMenu={'preventDefault'}
            onClick={() => {
              setModalPlaylistOptionOpen(false);
            }}
          >
            <HStack
              w={'100%'}
              h={'70px'}
              padding={'20px'}
              borderRadius={'8px'}
              justifyContent={'space-between'}
            >
              <Icon
                as={queueState ? MdQueue : IoLibrarySharp}
                boxSize={'28px'}
                color={'#535353'}
              />
              <Text fontSize={'16px'}>{queueState ? 'Queue' : 'Playlist'}</Text>
              <ModalPlaylistCode />
            </HStack>
            <VStack
              gap={'0px'}
              overflow={'scroll'}
              w={'100%'}
              maxW={'100%'}
              height={'100%'}
              justifyContent={'space-between'}
            >
              {!queueState ? (
                <PlaylistBarView
                  mooseCoord={mooseCoord}
                  playlists={playlists ?? []}
                  isModalPlaylistOptionOpen={isModalPlaylistOptionOpen}
                  setSelectedAlbumOrSong={setSelectedAlbumOrSong}
                  setMouseCoord={setMouseCoord}
                  setModalPlaylistOptionOpen={setModalPlaylistOptionOpen}
                />
              ) : (
                <QueueView setSelectedAlbumOrSong={setSelectedAlbumOrSong} />
              )}
              <VStack
                w={'100%'}
                h={'auto'}
                alignItems={'flex-end'}
                justifyContent={'flex-end'}
              ></VStack>
            </VStack>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}
