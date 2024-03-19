import { Box, HStack, VStack, Text, Image } from '@chakra-ui/react';

export function Navbar() {
  return (
    <VStack w={'100%'} backgroundColor={'#FF9615'} alignItems={'flex-start'}>
      <HStack height={'80px'} margin={'0 40px'}>
        <Box>
          <Image src="/logo1.png" boxSize="40px" objectFit="cover"></Image>
        </Box>
        <Text fontSize="4xl" as="b" color={'#000000'}>
          Vibeefy
        </Text>
      </HStack>
    </VStack>
  );
}
