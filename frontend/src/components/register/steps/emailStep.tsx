import { VStack, Text } from '@chakra-ui/react';

export function EmailStep({ children }: { children: React.ReactNode }) {
  return (
    <VStack gap={'40px'}>
      <Text fontSize={'xl'} color={'#ffffff'}>
        Sign up for start listening
      </Text>
      <VStack
        borderBottom={'1px solid #4E4E4E'}
        w={'100%'}
        marginBottom={'20px'}
      />
      {children}
    </VStack>
  );
}
