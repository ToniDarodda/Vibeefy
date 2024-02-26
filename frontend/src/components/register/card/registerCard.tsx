import { VStack, HStack, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterStep } from '../registerSteps';

export enum RegisterFlow {
  EMAIL = 0,
  PASSWORD = 1,
  BIRTH = 2,
  VALIDATE = 3,
}

export function RegisterCard() {
  const navigate = useNavigate();
  const redirectLogin = () => navigate('/');

  const [registerFlow, setRegisterFlow] = useState<RegisterFlow>(
    RegisterFlow.EMAIL,
  );

  const registerFlowNextStep = () => {
    setRegisterFlow((prev) => prev + 1);
  };

  const registerFlowPrevStep = () =>
    setRegisterFlow((prev: RegisterFlow) => prev - 1);

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
      <HStack h={'700px'} marginTop={'30px'} flexDirection={'column'}>
        <VStack w={'100%'} alignItems={'flex-start'}>
          <RegisterStep
            registerFlow={registerFlow}
            registerFlowPrevStep={registerFlowPrevStep}
          />
        </VStack>

        <Button
          w={'300px'}
          h={'60px'}
          marginBottom={'76px'}
          type="submit"
          fontSize={'xl'}
          color={'#ffffff'}
          fontWeight={'bold'}
          backgroundColor={'#FF9615'}
          onClick={registerFlowNextStep}
          _hover={{ backgroundColor: '#ff9615ac' }}
          _active={{ backgroundColor: '#ff961563' }}
        >
          {registerFlow !== RegisterFlow.VALIDATE ? 'Next' : 'Register'}
        </Button>

        <VStack
          borderBottom={'1px solid #4E4E4E'}
          w={'100%'}
          marginBottom={'20px'}
        />

        <VStack flexDirection={'row'} gap={'10px'} onClick={redirectLogin}>
          <Text color={'#ffffff'} cursor={'pointer'}>
            Already have an account?
          </Text>
          <Text
            color={'#ffffff'}
            as={'u'}
            cursor={'pointer'}
            fontWeight={'bold'}
            _hover={{ color: '#9c9c9c' }}
          >
            Log in here
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}
