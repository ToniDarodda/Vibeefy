import { forwardRef } from 'react';
import { HStack, Input } from '@chakra-ui/react';

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
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #2B2B2B"
            position={'sticky'}
          >
            <HStack width={'100%'} gap={'180px'} justifyContent={'center'}>
              <Input
                ref={ref}
                {...rest}
                onChange={(e) => setSearch(e.target.value)}
                justifySelf={'center'}
                alignItems={'center'}
                w={'500px'}
                color={'#ffffff'}
                backgroundColor={'#4E4E4E'}
                transition="width 1s, height 1s"
                _placeholder={{
                  color: '#ffffff7d',
                }}
                focusBorderColor="1px solid transparent"
                _focus={{
                  border: '1px solid #ffffff',
                  w: '600px',
                }}
                placeholder="Browse your favorite music..."
                border={'1px solid transparent'}
                onContextMenu={(e) => {
                  e.stopPropagation();
                }}
              />
            </HStack>
          </HStack>
        )}
      </>
    );
  },
);
