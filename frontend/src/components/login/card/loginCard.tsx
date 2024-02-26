/* eslint-disable @typescript-eslint/no-unused-vars */
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
  useMediaQuery,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardInterface {
  title: string;
}

export function LoginCard({ title }: CardInterface) {
  const navigate = useNavigate();

  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);
  const redirectRegister = () => navigate('/register');

  return (
    <VStack
      w={{
        base: '350px',
        md: '700px',
        sm: '500px',
      }}
      backgroundColor={{
        base: 'transparent',
        md: '#1E1E1E',
        sm: '#1E1E1E',
      }}
      borderRadius={'12px'}
    >
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

        <VStack w={'100%'} alignItems={'center'}>
          <Text fontSize={'xl'} color={'#ffffff'}>
            Email or username
          </Text>
          <Input
            w={{
              base: '300px',
              sm: '400px',
              md: '500px',
            }}
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

          <InputGroup alignItems={'center'} justifyContent={'center'}>
            <Input
              h={'70px'}
              w={{
                base: '300px',
                sm: '400px',
                md: '500px',
              }}
              color={'#ffffff'}
              focusBorderColor="#000000"
              placeholder="Enter your information..."
              _hover={{ border: '2px solid #ffffff' }}
              _focus={{ border: '2px solid #FF9615' }}
              type={show ? 'text' : 'password'}
            />
            <InputRightElement
              w={{
                base: '300px',
                sm: '400px',
                md: '500px',
              }}
              height={'100%'}
              justifyContent={'flex-end'}
              marginRight={{
                base: '40px',
                sm: '20px',
                md: '20px',
              }}
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
        <VStack borderBottom={'1px solid #4E4E4E'} w={'60%'} />
        <VStack flexDirection={'row'} gap={'10px'} onClick={redirectRegister}>
          <Text
            color={'#ffffff'}
            cursor={'pointer'}
            fontSize={{
              base: '12px',
              sm: '16px',
              md: '16px',
            }}
          >
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
