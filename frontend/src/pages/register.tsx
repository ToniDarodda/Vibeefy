import { VStack } from '@chakra-ui/react';
import { RegisterCard } from '../components/Register/Card/registerCard';
import { Navbar } from '../components/Shared/Navbar/navbar';

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
