import { useState } from 'react';
import {
  VStack,
  Input,
  Text,
  Checkbox,
  HStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useCreateUser } from '../../query/user';
import PasswordInput from '../shared/Input/passwordInput';
import { BaseStep } from './steps/baseStep';
import { EmailStep } from './steps/emailStep';

enum RegisterFlow {
  EMAIL = 0,
  PASSWORD = 1,
  BIRTH = 2,
  VALIDATE = 3,
}

type Inputs = {
  email: string;
  pseudo: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
};

export function RegisterStep() {
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate: createUser } = useCreateUser();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Inputs>();

  const whichStep = (): (keyof Inputs)[] => {
    switch (registerFlow) {
      case RegisterFlow.EMAIL: {
        return ['email'];
      }
      case RegisterFlow.PASSWORD: {
        return ['password', 'rePassword'];
      }
      case RegisterFlow.BIRTH: {
        return ['dateOfBirth', 'pseudo'];
      }
      case RegisterFlow.VALIDATE: {
        return ['pseudo'];
      }
    }
  };

  const rfns = async () => {
    const isFormValid = await trigger(whichStep());
    if (isFormValid) {
      if (registerFlow < RegisterFlow.VALIDATE) {
        setRegisterFlow((prev) => prev + 1);
      }
    } else {
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<Inputs> = ({ rePassword, ...data }: Inputs) => {
    createUser(
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

  const [registerFlow, setRegisterFlow] = useState<RegisterFlow>(
    RegisterFlow.EMAIL,
  );

  const registerFlowPrevStep = () =>
    setRegisterFlow((prev: RegisterFlow) => prev - 1);

  return (
    <>
      {registerFlow === RegisterFlow.EMAIL && (
        <EmailStep>
          <VStack alignItems={'flex-start'} gap={'20px'}>
            <Text fontSize={'xl'}>Email or username</Text>
            <Input
              w={{
                base: '300px',
                sm: '400px',
                md: '500px',
              }}
              h={'70px'}
              type="email"
              focusBorderColor="#000000"
              placeholder="Enter your information..."
              marginBottom={errors.email?.message ? '10px' : '184px'}
              _hover={{ border: '2px solid #ffffff' }}
              _focus={{ border: '2px solid #FF9615' }}
              {...register('email', { required: 'Ce champ est obligatoire' })}
            />
            <Text
              color="red.500"
              alignSelf={'center'}
              marginBottom={errors.email?.message ? '150px' : '0px'}
              as={'b'}
            >
              {errors.email?.message}
            </Text>
          </VStack>
        </EmailStep>
      )}
      {registerFlow === RegisterFlow.PASSWORD && (
        <BaseStep
          registerFlowPrevStep={registerFlowPrevStep}
          step="1"
          barValue={33.33}
        >
          <VStack
            alignItems={'flex-start'}
            gap={'20px'}
            w={{
              base: '300px',
              sm: '400px',
              md: '500px',
            }}
          >
            <Text fontSize={'xl'}>Password</Text>
            <PasswordInput
              {...register('password', {
                required: 'Ce champ est obligatoire',
              })}
            />
            <Text color="red.500" alignSelf={'center'} as={'b'}>
              {errors.password?.message}
            </Text>
            <Text fontSize={'xl'}>Re-type password</Text>
            <PasswordInput
              placeHolder="Enter your password again..."
              {...register('rePassword', {
                required: 'Ce champ est obligatoire',
                validate: (value) =>
                  value === watch('password') || 'The passwords do not match',
              })}
            />
            <Text color="red.500" alignSelf={'center'} as={'b'}>
              {errors.rePassword?.message}
            </Text>
          </VStack>
        </BaseStep>
      )}
      {registerFlow === RegisterFlow.BIRTH && (
        <BaseStep
          registerFlowPrevStep={registerFlowPrevStep}
          barValue={66.66}
          step="2"
        >
          <VStack
            alignItems={'flex-start'}
            gap={'20px'}
            w={{
              base: '300px',
              sm: '400px',
              md: '500px',
            }}
          >
            <Text fontSize={'xl'}>Name</Text>
            <Input
              w={{
                base: '300px',
                sm: '400px',
                md: '500px',
              }}
              h={'70px'}
              type="name"
              focusBorderColor="#000000"
              placeholder="Enter your information..."
              _hover={{ border: '2px solid #ffffff' }}
              _focus={{ border: '2px solid #FF9615' }}
              {...register('pseudo', { required: 'Ce champ est obligatoire' })}
            />
            <Text color="red.500" alignSelf={'center'} as={'b'}>
              {errors.pseudo?.message}
            </Text>
            <Text fontSize={'xl'}>Date of birth</Text>
            <Input
              w={{
                base: '300px',
                sm: '400px',
                md: '500px',
              }}
              h={'70px'}
              type="date"
              color={'#ffffff'}
              focusBorderColor="#000000"
              placeholder="DD / MM / YYYY"
              _hover={{ border: '2px solid #ffffff' }}
              _focus={{ border: '2px solid #FF9615' }}
              {...register('dateOfBirth', {
                required: 'Ce champ est obligatoire',
              })}
              _placeholder={{
                color: '#636363',
              }}
              sx={{
                '::-webkit-calendar-picker-indicator': {
                  visibility: 'hidden',
                },
              }}
            />
            <Text color="red.500" alignSelf={'center'} as={'b'}>
              {errors.dateOfBirth?.message}
            </Text>
          </VStack>
        </BaseStep>
      )}
      {registerFlow === RegisterFlow.VALIDATE && (
        <BaseStep
          registerFlowPrevStep={registerFlowPrevStep}
          barValue={100}
          step="3"
        >
          <VStack
            w={{
              base: '300px',
              sm: '400px',
              md: '500px',
            }}
            alignSelf={'center'}
            backgroundColor={'#333030'}
            borderRadius={'8px'}
            paddingLeft={'20px'}
          >
            <HStack h={'60px'} gap={'30px'}>
              <Checkbox size={'lg'} colorScheme="orange" border={'orange'} />
              <Text
                fontSize={{
                  base: '12px',
                  sm: '14px',
                  md: '14px',
                }}
              >
                Share my registration data with Vibeefy's content providers for
                marketing purposes.
              </Text>
            </HStack>
          </VStack>
          <VStack
            w={{
              base: '300px',
              sm: '400px',
              md: '500px',
            }}
            alignSelf={'center'}
          >
            <Text>
              By clicking on sign-up, you agree to Vibeefy's Terms and
              Conditions of Use.
            </Text>
            <Text>
              To learn more about how Vibeefy collects, uses, shares and
              protects your personal data, please see Vibeefy's Privacy Policy.
            </Text>
          </VStack>
        </BaseStep>
      )}
      <Button
        w={'300px'}
        h={'60px'}
        marginBottom={'76px'}
        alignSelf={'center'}
        type="submit"
        fontSize={'xl'}
        color={'#ffffff'}
        fontWeight={'bold'}
        backgroundColor={'#FF9615'}
        onClick={registerFlow === 3 ? handleSubmit(onSubmit) : rfns}
        _hover={{ backgroundColor: '#ff9615ac' }}
        _active={{ backgroundColor: '#ff961563' }}
      >
        {registerFlow !== RegisterFlow.VALIDATE ? 'Next' : 'Register'}
      </Button>
    </>
  );
}
