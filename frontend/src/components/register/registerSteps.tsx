import { VStack, Input, Text, Checkbox, HStack } from '@chakra-ui/react';
import { PasswordInput } from '../input/passwordInput';
import { RegisterFlow } from './card/registerCard';
import { EmailStep } from './steps/emailStep';
import { BaseStep } from './steps/baseStep';

interface RegisterFlowInterface {
  registerFlow: RegisterFlow;
  registerFlowPrevStep: () => void;
}

export function RegisterStep({
  registerFlow,
  registerFlowPrevStep,
}: RegisterFlowInterface) {
  return (
    <>
      {registerFlow === RegisterFlow.EMAIL && (
        <EmailStep>
          <VStack alignItems={'flex-start'} gap={'20px'}>
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
              marginBottom={'184px'}
              _hover={{ border: '2px solid #ffffff' }}
              _focus={{ border: '2px solid #FF9615' }}
            />
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
            <Text fontSize={'xl'} color={'#ffffff'}>
              Password
            </Text>
            <PasswordInput />
            <Text fontSize={'xl'} color={'#ffffff'}>
              Re-type password
            </Text>
            <PasswordInput placeHolder="Enter your password again..." />
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
            <Text fontSize={'xl'} color={'#ffffff'}>
              Name
            </Text>
            <Input
              w={{
                base: '300px',
                sm: '400px',
                md: '500px',
              }}
              h={'70px'}
              type="name"
              color={'#ffffff'}
              focusBorderColor="#000000"
              placeholder="Enter your information..."
              _hover={{ border: '2px solid #ffffff' }}
              _focus={{ border: '2px solid #FF9615' }}
            />
            <Text fontSize={'xl'} color={'#ffffff'}>
              Date of birth
            </Text>
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
              _placeholder={{
                color: '#636363',
              }}
              sx={{
                '::-webkit-calendar-picker-indicator': {
                  visibility: 'hidden',
                },
              }}
            />
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
                color={'#ffffff'}
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
            <Text color={'#ffffff'}>
              By clicking on sign-up, you agree to Vibeefy's Terms and
              Conditions of Use.
            </Text>
            <Text color={'#ffffff'}>
              To learn more about how Vibeefy collects, uses, shares and
              protects your personal data, please see Vibeefy's Privacy Policy.
            </Text>
          </VStack>
        </BaseStep>
      )}
    </>
  );
}
