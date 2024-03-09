import { useState } from 'react';
import { VStack, HStack, Text, Image, Icon } from '@chakra-ui/react';

import { ModalPlaylistOpen } from './modal/playlistOpen';
import { ModalPlaylistOption } from './modal/playlistOption';
import { PlaylistType, AlbumInterface } from '../../../interfaces';
import { MdHome, MdSearch } from 'react-icons/md';
import { useAudioPlayerContext } from '../../../contexts';
import { formatTime } from '../../../utils';

interface PlaylistBarInterface {
  queueView: boolean;
  isLargardThan1000: boolean;
  playlists: PlaylistType[] | undefined;

  setIsSearching: (b: boolean) => void;
  setPlaylistView: (tmp: boolean) => void;
  setSelectedAlbumOrSong: React.Dispatch<
    React.SetStateAction<AlbumInterface | PlaylistType | undefined>
  >;
}

export function PlaylistBar({
  playlists,
  queueView,
  setIsSearching,
  setPlaylistView,
  isLargardThan1000,
  setSelectedAlbumOrSong,
}: PlaylistBarInterface) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const { queue } = useAudioPlayerContext();

  const [isModalPlaylistOpen, setModalPlaylistOpen] = useState<boolean>(false);
  const [isModalPlaylistOptionOpen, setModalPlaylistOptionOpen] =
    useState<boolean>(false);
  const [mooseCoord, setMouseCoord] = useState<{
    clientX: number;
    clientY: number;
  }>({ clientX: 0, clientY: 0 });

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
              onClick={() => setIsSearching(false)}
            >
              <Icon
                as={MdHome}
                color={'#535353'}
                boxSize={'30px'}
                _hover={{ color: '#ffffff' }}
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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                setIsSearching(true);
                setPlaylistView(false);
              }}
            >
              <Icon
                as={MdSearch}
                color={isHovered ? '#ffffff' : '#535353'}
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
              setModalPlaylistOpen(true);
              setMouseCoord({ clientX: e.clientX, clientY: e.clientY });
            }}
            contextMenu={'preventDefault'}
            onClick={() => {
              setModalPlaylistOpen(false);
              setModalPlaylistOptionOpen(false);
            }}
          >
            <ModalPlaylistOpen
              isModalPlaylistOpen={isModalPlaylistOpen}
              mooseCoord={mooseCoord}
              playlistsLength={playlists?.length}
            />
            <HStack
              w={'100%'}
              gap={'20%'}
              padding={'12px'}
              borderRadius={'8px'}
              onClick={() => setIsSearching(true)}
            >
              <Image src="/pl.png" boxSize={'28px'} />
              <Text fontSize={'16px'}>
                {queueView ? 'Your queue' : 'Your library'}
              </Text>
            </HStack>
            <VStack gap={'20px'} overflow={'scroll'} w={'100%'} maxH={'60%'}>
              {!queueView ? (
                playlists?.map((playlist: PlaylistType, idx: number) => {
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
                })
              ) : (
                <>
                  {queue.map((q, idx) => {
                    return (
                      <HStack
                        w={'100%'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        padding={'10px'}
                      >
                        <Image
                          src={q.thumbnails}
                          boxSize={'40px'}
                          borderRadius={'4px'}
                        />
                        <Text key={idx} cursor={'pointer'} fontSize={'14px'}>
                          {q.title}
                        </Text>
                        <Text key={idx} cursor={'pointer'} fontSize={'14px'}>
                          {formatTime(q.songDuration)}
                        </Text>
                      </HStack>
                    );
                  })}
                </>
              )}
            </VStack>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}
