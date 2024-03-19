import { VStack } from '@chakra-ui/react';

import { RegisterCard } from '../components/register/card/registerCard';
import { Navbar } from '../components/shared/navbar/navbar';

export function Register() {
  return (
    <VStack backgroundColor={'#262626'} height={'auto'} minH={'100vh'}>
      <Navbar />
      <VStack
        h={'100%'}
        w={'100%'}
        minH={'100vh'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <RegisterCard />
      </VStack>
    </VStack>
  );
}
