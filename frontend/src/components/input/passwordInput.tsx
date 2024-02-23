import { InputGroup, Input, InputRightElement, Image } from '@chakra-ui/react';
import { useState } from 'react';

interface PasswordInputInterface {
  isImage?: boolean;
  isInGroup?: boolean;
  placeHolder?: string;
}

export function PasswordInput({
  isImage = true,
  isInGroup,
  placeHolder = 'Enter your password...',
}: PasswordInputInterface) {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    if (isInGroup !== undefined) setShow(isInGroup);
    else setShow(!show);
  };

  return (
    <InputGroup size="md">
      <Input
        h={'70px'}
        w={'500px'}
        color={'#ffffff'}
        focusBorderColor="#000000"
        placeholder={placeHolder}
        _hover={{ border: '2px solid #ffffff' }}
        _focus={{ border: '2px solid #FF9615' }}
        type={show ? 'text' : 'password'}
      />
      {isImage && (
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
      )}
    </InputGroup>
  );
}
