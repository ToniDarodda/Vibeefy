import { HStack, Image, Text } from '@chakra-ui/react';
import { formatTime } from '../../../utils';
import { SongInterface } from '../../../interfaces';

interface QueueViewInterface {
  queue: (SongInterface & {
    link?: string | undefined;
  })[];
}

export function QueueView({ queue }: QueueViewInterface) {
  return (
    <>
      {queue.map((q, idx) => {
        return (
          <HStack
            w={'100%'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding={'10px'}
          >
            <Image src={q.thumbnails} boxSize={'40px'} borderRadius={'4px'} />
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
  );
}
