import {
  HStack,
  VStack,
  Text,
  Input,
  Switch,
  Button,
  InputGroup,
  InputRightElement,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardInterface {
  title: string;
}

export function LoginCard({ title }: CardInterface) {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);
  const redirectRegister = () => navigate('/register');

  return (
    <VStack w={'800px'} backgroundColor={'#1E1E1E'} borderRadius={'12px'}>
      <HStack
        h={'700px'}
        marginTop={'30px'}
        flexDirection={'column'}
        gap={'30px'}
      >
        <Text fontSize={'4xl'} as={'b'} color={'#ffffff'}>
          {title}
        </Text>
        <VStack borderBottom={'1px solid #4E4E4E'} w={'100%'} />

        <VStack w={'100%'} alignItems={'flex-start'}>
          <Text fontSize={'xl'} color={'#ffffff'}>
            Email or username
          </Text>
          <Input
            w={'500px'}
            h={'70px'}
            type="email"
            color={'#ffffff'}
            focusBorderColor="#000000"
            placeholder="Enter your information..."
            _hover={{ border: '2px solid #ffffff' }}
            _focus={{ border: '2px solid #FF9615' }}
            marginBottom={'20px'}
          />

          <Text fontSize={'xl'} color={'#ffffff'}>
            Password
          </Text>

          <InputGroup size="md">
            <Input
              h={'70px'}
              w={'500px'}
              color={'#ffffff'}
              focusBorderColor="#000000"
              placeholder="Enter your information..."
              _hover={{ border: '2px solid #ffffff' }}
              _focus={{ border: '2px solid #FF9615' }}
              type={show ? 'text' : 'password'}
            />
            <InputRightElement
              width="4.5rem"
              height={'100%'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Image
                src={show ? '/hide.png' : '/unhide.png'}
                boxSize={'40px'}
                onClick={handleClick}
                cursor={'pointer'}
              />
            </InputRightElement>
          </InputGroup>
        </VStack>

        <VStack flexDirection={'row'}>
          <Switch colorScheme="orange" />
          <Text fontSize={'md'} color={'#ffffff'}>
            Remember me?
          </Text>
        </VStack>

        <Button
          w={'300px'}
          h={'60px'}
          backgroundColor={'#FF9615'}
          color={'#ffffff'}
          fontSize={'xl'}
          _hover={{ backgroundColor: '#ff9615ac' }}
          _active={{ backgroundColor: '#ff961563' }}
          fontWeight={'bold'}
          type="submit"
        >
          Login
        </Button>
        <Text
          color={'#ffffff'}
          as={'u'}
          cursor={'pointer'}
          fontWeight={'bold'}
          _hover={{ color: '#9c9c9c' }}
        >
          Forgot your password?
        </Text>
        <VStack borderBottom={'1px solid #4E4E4E'} w={'100%'} />
        <VStack flexDirection={'row'} gap={'10px'} onClick={redirectRegister}>
          <Text color={'#ffffff'} cursor={'pointer'}>
            Don't have an account yet?
          </Text>
          <Text
            color={'#ffffff'}
            as={'u'}
            cursor={'pointer'}
            fontWeight={'bold'}
            _hover={{ color: '#9c9c9c' }}
          >
            Sign up for Vibeefy
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}
