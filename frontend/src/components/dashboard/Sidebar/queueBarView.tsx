import { HStack, Image, Text, VStack } from '@chakra-ui/react';
import {
  AlbumInterface,
  BasePlaylistInterface,
  SongInterface,
} from '../../../interfaces';
import { truncateText } from '../../../utils/truncatText';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useGetAlbum } from '../../../query';

interface QueueViewInterface {
  queue: (SongInterface & {
    link?: string | undefined;
  })[];
  setSelectedAlbumOrSong: Dispatch<
    SetStateAction<AlbumInterface | BasePlaylistInterface | undefined>
  >;
  setPlaylistView: (tmp: boolean) => void;
}

export function QueueView({
  queue,
  setPlaylistView,
  setSelectedAlbumOrSong,
}: QueueViewInterface) {
  const [clickedAlbum, setClickedAlbum] = useState<SongInterface | null>(null);
  const { data: albums } = useGetAlbum(clickedAlbum?.albumName ?? '', 1, 0);

  useEffect(() => {
    if (albums) setSelectedAlbumOrSong(albums[0]);
  }, [clickedAlbum]);

  return (
    <VStack w={'100%'} h={'560px'}>
      {queue.map((q, idx) => {
        return (
          <HStack
            w={'100%'}
            alignItems={'center'}
            padding={'10px'}
            onClick={() => {
              setPlaylistView(true);
              setClickedAlbum(q);
            }}
          >
            <Image src={q.thumbnails} boxSize={'60px'} borderRadius={'4px'} />
            <VStack alignItems={'flex-start'}>
              <Text key={idx} cursor={'pointer'}>
                {truncateText(q.title, 30)}
              </Text>
              <Text color={'#818181'}>{q.albumName?.split('(')[0]}</Text>
            </VStack>
          </HStack>
        );
      })}
    </VStack>
  );
}
