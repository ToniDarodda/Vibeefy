import { RefObject, forwardRef, useEffect, useState } from 'react';
import { HStack, Input, Icon, VStack } from '@chakra-ui/react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdAccountCircle,
} from 'react-icons/md';

interface SearchBarInterface {
  isSearching: boolean;
  search: string;
  inputRef: RefObject<HTMLInputElement>;

  setSearch: (b: string) => void;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarInterface>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isSearching, setSearch, search, inputRef, ...rest }, _ref) => {
    const [inputValue, setInputValue] = useState<string>(search);
    const [lastInput, setLastInput] = useState<string>('');

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setSearch(inputValue);
      }, 200);

      return () => clearTimeout(timeoutId);
    }, [inputValue, setSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleResetSearch = () => {
      setLastInput(search);
      setSearch('');
      setInputValue('');
    };

    const handleLastSearch = () => {
      setInputValue(lastInput);
      setSearch(lastInput);
      setLastInput('');
    };

    return (
      <>
        {isSearching && (
          <HStack
            w={'100%'}
            padding={'12px'}
            justifyContent={'center'}
            top={'0'}
            backgroundColor={'#2b2b2b'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #121212"
            position={'sticky'}
          >
            <HStack width={'100%'} justifyContent={'flex-start'}>
              <VStack backgroundColor={'#191919'} borderRadius={'100px'}>
                <Icon
                  as={MdKeyboardArrowLeft}
                  color={inputValue.length > 0 ? '#ffffff' : '#959595'}
                  boxSize={'34px'}
                  onClick={handleResetSearch}
                />
              </VStack>
              <VStack backgroundColor={'#191919'} borderRadius={'100px'}>
                <Icon
                  as={MdKeyboardArrowRight}
                  color={lastInput.length > 0 ? '#ffffff' : '#959595'}
                  boxSize={'34px'}
                  onClick={handleLastSearch}
                />
              </VStack>
              <Input
                ref={inputRef}
                autoFocus
                color={'#ffffff'}
                {...rest}
                value={inputValue}
                onChange={handleChange}
                w={'400px'}
                backgroundColor={'#1b1b1b'}
                _placeholder={{
                  color: '#c7c7c7c1',
                }}
                focusBorderColor="1px solid transparent"
                _focus={{
                  border: '1px solid #ffffff',
                }}
                placeholder="Browse your favorite music..."
                border={'1px solid transparent'}
                onContextMenu={(e) => {
                  e.stopPropagation();
                }}
              />
            </HStack>
            <Icon
              as={MdAccountCircle}
              color={'#868686'}
              boxSize={'30px'}
              cursor={'pointer'}
              _hover={{
                color: '#ffffff',
              }}
            />
          </HStack>
        )}
      </>
    );
  },
);
