/* eslint-disable @typescript-eslint/no-unused-vars */
import { HStack, Image, Text, VStack } from '@chakra-ui/react';
import {
  AlbumInterface,
  BasePlaylistInterface,
  SongInterface,
} from '../../../interfaces';
import { truncateText } from '../../../utils/truncatText';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useGetAlbum } from '../../../query';
import { useAudioPlayerContext } from '../../../contexts';
import {
  ViewStateEnum,
  useViewStateContext,
} from '../../../contexts/viewState.context';

interface QueueViewInterface {
  setSelectedAlbumOrSong: Dispatch<
    SetStateAction<AlbumInterface | BasePlaylistInterface | undefined>
  >;
}

export function QueueView({ setSelectedAlbumOrSong }: QueueViewInterface) {
  const { queue, playlistQueue } = useAudioPlayerContext();

  const { setViewState } = useViewStateContext();

  const [clickedAlbum, setClickedAlbum] = useState<SongInterface | null>(null);

  const { data: albums } = useGetAlbum(clickedAlbum?.albumName ?? '', 1, 0);

  const getAlbumName = (albumName: string | undefined) => {
    if (albumName && albumName.length > 0) return albumName.split('(')[0];

    return '';
  };

  useEffect(() => {
    if (albums && clickedAlbum !== null) setSelectedAlbumOrSong(albums[0]);
  }, [clickedAlbum]);

  return (
    <VStack w={'100%'} h={'560px'}>
      {queue.map((q, index) => {
        return (
          <HStack
            key={index}
            w={'100%'}
            alignItems={'center'}
            padding={'10px'}
            onClick={() => {
              setClickedAlbum(q);
              setViewState(ViewStateEnum.PLAYLIST);
            }}
          >
            <Image src={q.thumbnails} boxSize={'60px'} borderRadius={'4px'} />
            <VStack alignItems={'flex-start'}>
              <Text cursor={'pointer'}>
                {truncateText(q.title.split('(')[0], 20)}
              </Text>
              <Text color={'#818181'}>{getAlbumName(q.albumName)}</Text>
            </VStack>
          </HStack>
        );
      })}
      <VStack
        h={'2px'}
        borderBottom={'1px solid #2b2a2a'}
        w={'100%'}
        marginTop={'20px'}
      />
      {playlistQueue[0] && (
        <Text alignSelf={'flex-start'}>
          Next from:{' '}
          {playlistQueue[0] && getAlbumName(playlistQueue[0].albumName ?? '')}
        </Text>
      )}
      {playlistQueue.map((q, index) => {
        return (
          <HStack
            key={index}
            w={'100%'}
            alignItems={'center'}
            padding={'10px'}
            onClick={() => {
              setClickedAlbum(q);
              setViewState(ViewStateEnum.SEARCH);
            }}
          >
            <Image src={q.thumbnails} boxSize={'60px'} borderRadius={'4px'} />
            <VStack alignItems={'flex-start'}>
              <Text cursor={'pointer'}>
                {getAlbumName(truncateText(q.title, 20))}
              </Text>
              <Text color={'#818181'}>{q.albumName?.split('(')[0]}</Text>
            </VStack>
          </HStack>
        );
      })}
    </VStack>
  );
}
