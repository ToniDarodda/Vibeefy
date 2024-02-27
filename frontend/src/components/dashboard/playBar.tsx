import {
  HStack,
  Text,
  Image,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Progress,
  Stack,
} from '@chakra-ui/react';

interface PlaybarInterface {
  isListening: boolean;
  isLargerThan1000: boolean;
  setIsSearching: (x: boolean) => void;
  listeningSong: string;
  listeningImage?: string;
}

export function Playbar({
  isListening,
  listeningSong,
  isLargerThan1000,
  setIsSearching,
}: PlaybarInterface) {
  return (
    <>
      {isListening && isLargerThan1000 && (
        <HStack
          w={'100%'}
          h={'80px'}
          borderRadius={'8px'}
          backgroundColor={'#3d3d3d'}
          justifyContent={'space-between'}
          padding={'20px'}
          background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #2B2B2B"
        >
          <HStack flex={1} gap={'20px'}>
            <Image src="/k.png" boxSize={'60px'} />
            <VStack alignItems={'flex-start'}>
              <Text color={'#ffffff'}>{listeningSong}</Text>
              <Text color={'#ffffff62'}>Saison 2</Text>
            </VStack>
            <Image src="/like.png" boxSize={'16px'} cursor={'pointer'} />
          </HStack>

          <VStack flex={3} gap={'20px'}>
            <HStack gap={'60px'}>
              <Image src="/nextl.png" cursor={'pointer'} boxSize={'20px'} />
              <Image src="/pause.png" cursor={'pointer'} boxSize={'38px'} />
              <Image src="/nextr.png" cursor={'pointer'} boxSize={'20px'} />
            </HStack>
            <HStack
              w={'90%'}
              h={'4px'}
              justifyContent={'center'}
              alignItems={'center'}
              //   onClick={(e) => console.log(e)}
            >
              <Text color={'#ffffff'} textAlign={'center'}>
                0m30
              </Text>
              <Stack spacing={5} h={'100%'} w={'80%'}>
                <Progress
                  colorScheme="orange"
                  size="md"
                  value={20}
                  borderRadius={'8px'}
                />
              </Stack>
              <Text color={'#ffffff'} textAlign={'center'}>
                3m02
              </Text>
            </HStack>
          </VStack>

          <HStack flex={1} alignItems={'center'} justifyContent={'flex-end'}>
            <Image src="/volume.png" boxSize={'30px'} />

            <Slider
              w={'50%'}
              aria-label="slider-ex-1"
              defaultValue={30}
              colorScheme="orange"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={'10px'} borderColor={'orange'} />
            </Slider>
          </HStack>
        </HStack>
      )}{' '}
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
            <Image src="/k.png" boxSize={'50px'} />
            <VStack alignItems={'flex-start'} gap={'4px'} marginRight={'8px'}>
              <Text color={'#ffffff'}>{listeningSong}</Text>
              <Text color={'#ffffff8a'}>Saison 2</Text>
            </VStack>

            <Image src="/like.png" boxSize={'20px'} cursor={'pointer'} />
            <HStack
              alignItems={'center'}
              flex={1}
              justifyContent={'flex-end'}
              gap={'20px'}
            >
              <Image src="/pause.png" boxSize={'30px'} cursor={'pointer'} />
              <Image src="/nextr.png" boxSize={'20px'} cursor={'pointer'} />
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
