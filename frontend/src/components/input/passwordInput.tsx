import { InputGroup, Input, InputRightElement, Image } from '@chakra-ui/react';
import { useState, forwardRef } from 'react';

interface PasswordInputInterface {
  isImage?: boolean;
  isInGroup?: boolean;
  placeHolder?: string;
}

// Wrap your component with forwardRef. It provides refs and props as parameters.
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputInterface>(
  (
    {
      isImage = true,
      isInGroup,
      placeHolder = 'Enter your password...',
      ...rest
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);
    const handleClick = () => {
      if (isInGroup !== undefined) setShow(isInGroup);
      else setShow(!show);
    };

    return (
      <InputGroup size="md">
        <Input
          ref={ref} // Forward the ref to the Input component
          {...rest}
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
  },
);

PasswordInput.displayName = 'PasswordInput'; // It's a good practice to set a displayName for your forwardRef components

export default PasswordInput;
