import { forwardRef } from 'react';
import { HStack, Input, Icon, VStack } from '@chakra-ui/react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdAccountCircle,
} from 'react-icons/md';

interface SearchBarInterface {
  isSearching: boolean;

  setSearch: (b: string) => void;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarInterface>(
  ({ isSearching, setSearch, ...rest }, ref) => {
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
                  color={'#ffffff'}
                  boxSize={'34px'}
                />
              </VStack>
              <VStack backgroundColor={'#191919'} borderRadius={'100px'}>
                <Icon
                  as={MdKeyboardArrowRight}
                  color={'#959595'}
                  boxSize={'34px'}
                />
              </VStack>
              <Input
                ref={ref}
                autoFocus
                color={'#ffffff'}
                {...rest}
                onChange={(e) => setSearch(e.target.value)}
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
