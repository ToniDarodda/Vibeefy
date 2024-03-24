import { HStack, Image, Text, VStack } from '@chakra-ui/react';
import { truncateText } from '../../utils/truncatText';
import { useAudioPlayerContext } from '../../contexts';
import {
  ViewStateEnum,
  useViewStateContext,
} from '../../contexts/viewState.context';

export function QueueView() {
  const { queue, playlistQueue } = useAudioPlayerContext();

  const { setViewState } = useViewStateContext();

  const getAlbumName = (albumName: string | undefined) => {
    if (albumName && albumName.length > 0) return albumName.split('(')[0];

    return '';
  };

  return (
    <VStack w={'100%'} h={'560px'} overflow={'scroll'}>
      {queue.map((q, index) => {
        return (
          <HStack w={'100%'} key={index} padding={'10px'} alignItems={'center'}>
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
        w={'100%'}
        marginTop={'20px'}
        borderBottom={'1px solid #2b2a2a'}
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
            padding={'10px'}
            alignItems={'center'}
            onClick={() => {
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
