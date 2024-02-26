import { VStack, Text, Image, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Loading() {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const fullText = 'Vibeefy';

  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeoutId = setTimeout(() => {
        setText(fullText.substring(0, text.length + 1));
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [text, fullText]);

  useEffect(() => {
    if (!isFetching) navigate('/dashboard');
  }, [isFetching]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsFetching(false);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <VStack
      h={'100vh'}
      backgroundColor={'#000000'}
      background={
        'linear-gradient(180deg, #262626 40.5%, rgba(38, 38, 38, 0.00) 1000%)'
      }
      justifyContent={'center'}
      alignItems={'center'}
      gap={'40px'}
    >
      <VStack flexDirection={'row'}>
        <Image src="/clogo.png" boxSize={'50px'}></Image>
        <Text
          color={'#ffffff'}
          fontSize={'60px'}
          transition={'ease-in-out'}
          as={'b'}
        >
          {text}
        </Text>
      </VStack>
      <Spinner color="#ffffff" boxSize={'50px'}></Spinner>
    </VStack>
  );
}
