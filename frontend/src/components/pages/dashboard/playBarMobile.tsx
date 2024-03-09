import { HStack, VStack, Text, Image } from '@chakra-ui/react';

interface PlayBarMobileInterface {
  thumbnail: string;
  isPaused: boolean;
  listeningSong: string;
  isLargerThan1000: boolean;
  togglePlayPause: () => void;
  setIsPaused: (b: boolean) => void;
  setIsSearching: (b: boolean) => void;
  playNext: () => void;
}

export function PlaybarMobile({
  isPaused,
  thumbnail,
  setIsPaused,
  listeningSong,
  isLargerThan1000,
  togglePlayPause,
  setIsSearching,
  playNext,
}: PlayBarMobileInterface) {
  return (
    <>
      {!isLargerThan1000 && (
        <>
          <HStack
            position={'fixed'}
            bottom={'90px'}
            backgroundColor={'#513e21'}
            w={'calc(100% - 20px)'}
            borderRadius={'8px'}
            h={'60px'}
            padding={'12px'}
            marginBottom={'4px'}
          >
            <Image src={thumbnail} boxSize={'50px'} />
            <VStack alignItems={'flex-start'} gap={'4px'} marginRight={'8px'}>
              <Text>{listeningSong}</Text>
              <Text color={'#ffffff8a'}>Saison 2</Text>
            </VStack>

            <Image src="/like.png" boxSize={'20px'} cursor={'pointer'} />
            <HStack
              alignItems={'center'}
              flex={1}
              justifyContent={'flex-end'}
              gap={'20px'}
            >
              <Image
                boxSize={'30px'}
                cursor={'pointer'}
                src={isPaused ? 'pause2.png' : '/pause.png'}
                onClick={() => {
                  togglePlayPause();
                  setIsPaused(!isPaused);
                }}
              />
              <Image
                src="/nextr.png"
                boxSize={'20px'}
                cursor={'pointer'}
                onClick={playNext}
              />
            </HStack>
          </HStack>
          <HStack
            w={'100%'}
            h={'80px'}
            borderRadius={'8px'}
            backgroundColor={'#3d3d3d'}
            justifyContent={'space-between'}
            alignItems={'center'}
            padding={'40px'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #2B2B2B"
          >
            <Image
              src="/home.png"
              boxSize={'30px'}
              onClick={() => setIsSearching(false)}
            />
            <Image
              src="/loop.png"
              boxSize={'30px'}
              onClick={() => setIsSearching(true)}
            />
            <Image src="/pl.png" boxSize={'30px'} />
          </HStack>
        </>
      )}
    </>
  );
}
