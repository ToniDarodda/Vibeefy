import { VStack, Stack, Progress, Button, Text } from '@chakra-ui/react';

interface BaseStepInterface {
  children: React.ReactNode;
  registerFlowNextStep: () => void;
  barValue: number;
  step: string;
}

export function BaseStep({
  children,
  registerFlowNextStep,
  barValue,
  step,
}: BaseStepInterface) {
  return (
    <VStack gap={'26px'}>
      <Text fontSize={'xl'} color={'#ffffff'}>
        Step {step} of 3
      </Text>
      <VStack alignItems={'flex-start'} marginBottom={'20px'}>
        <Stack w={'500px'}>
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
        onClick={registerFlowNextStep}
        marginBottom={'20px'}
      >
        {/* <Image src="/rarrow.png" boxSize={'30px'} /> */}
        Miss something?
      </Button>
    </VStack>
  );
}
