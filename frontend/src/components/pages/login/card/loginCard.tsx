import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
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
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useLoginUser } from '../../../../query/user';

type Inputs = {
  email: string;
  password: string;
};

interface CardInterface {
  title: string;
}

export function LoginCard({ title }: CardInterface) {
  const toast = useToast();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);
  const redirectRegister = () => navigate('/register');

  const { mutate: loginUser } = useLoginUser();

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginUser(
      {
        data,
      },
      {
        onSuccess: () => {
          navigate('/loading');
        },
        onError: (err) => {
          const axiosError = err as unknown as AxiosError<any>;

          toast({
            title: axiosError.response?.data.message,
            description: axiosError.response?.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
      },
    );
  };

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
            {...register('email', { required: 'Ce champ est obligatoire' })}
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
              {...register('password', {
                required: 'Ce champ est obligatoire',
              })}
            />

            <InputRightElement
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
          onClick={handleSubmit(onSubmit)}
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
