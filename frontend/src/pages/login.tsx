import { VStack } from '@chakra-ui/react';
import { Navbar } from '../components/Shared/Navbar/navbar';
import { LoginCard } from '../components/Card/loginCard';

export function Login(): JSX.Element {
  return (
    <VStack backgroundColor={'#262626'} height={'auto'} minH={'100vh'}>
      <Navbar />
      <VStack
        w={'100%'}
        h={'100%'}
        minH={'100vh'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <LoginCard title="Login to Vibeefy" />
      </VStack>
    </VStack>
  );
}
