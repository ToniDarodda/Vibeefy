import { VStack, HStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { RegisterStep } from '../registerSteps';

export function RegisterCard() {
  const navigate = useNavigate();
  const redirectLogin = () => navigate('/');

  return (
    <VStack
      w={{
        base: '350px',
        md: '700px',
        sm: '500px',
      }}
      h={'100%'}
      backgroundColor={{
        base: 'transparent',
        md: '#1E1E1E',
        sm: '#1E1E1E',
      }}
      borderRadius={'12px'}
    >
      <HStack h={'750px'} marginTop={'30px'} flexDirection={'column'}>
        <VStack w={'100%'} alignItems={'flex-start'}>
          <RegisterStep />
        </VStack>

        <VStack
          borderBottom={'1px solid #4E4E4E'}
          w={'100%'}
          marginBottom={'20px'}
        />

        <VStack flexDirection={'row'} gap={'10px'} onClick={redirectLogin}>
          <Text cursor={'pointer'}>Already have an account?</Text>
          <Text
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
