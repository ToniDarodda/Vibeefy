import { VStack, Stack, Progress, Button, Text } from '@chakra-ui/react';

interface BaseStepInterface {
  children: React.ReactNode;
  registerFlowPrevStep: () => void;
  barValue: number;
  step: string;
}

export function BaseStep({
  children,
  registerFlowPrevStep,
  barValue,
  step,
}: BaseStepInterface) {
  return (
    <VStack gap={'26px'} w={'100%'}>
      <Text fontSize={'xl'} color={'#ffffff'}>
        Step {step} of 3
      </Text>
      <VStack alignItems={'flex-start'} marginBottom={'20px'}>
        <Stack
          w={{
            base: '300px',
            sm: '400px',
            md: '500px',
          }}
        >
          <Progress
            colorScheme="orange"
            size="sm"
            value={barValue}
            borderRadius={'8px'}
          />
        </Stack>
      </VStack>
      {children}
      <Button
        w={'220px'}
        h={'40px'}
        backgroundColor={'transparent'}
        border={'1px solid #FF9615'}
        color={'#FF9615'}
        _hover={{ backgroundColor: '#ff9615ac' }}
        _active={{ backgroundColor: '#ff961563' }}
        type="submit"
        onClick={registerFlowPrevStep}
        marginBottom={'20px'}
      >
        Miss something?
      </Button>
    </VStack>
  );
}
