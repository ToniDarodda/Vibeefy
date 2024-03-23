import {
  ChangeEvent,
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
} from 'react';
import { HStack, Input, Icon, VStack, Text } from '@chakra-ui/react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdAccountCircle,
} from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { debounce } from 'lodash';

import { GetMusicType, useSearchProvider } from '../../contexts/search.context';

interface SearchBarInterface {
  inputRef: RefObject<HTMLInputElement>;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarInterface>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ inputRef, ...rest }, ref) => {
    const navigate = useNavigate();
    const { name } = useParams();

    const {
      setSearch,
      applyMusicTypeBackground,
      applyMusicTypeColor,
      handleClickMusicType,
      handleResetSearch,
      lastInput,
      inputValue,
      setInputValue,
    } = useSearchProvider();

    const handleNavigateBack = () => {
      navigate(-1);
    };

    const updateSearch = (searchValue: string) => {
      setSearch(searchValue);
      navigate(searchValue ? `/search/${searchValue}` : '/search');
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInputValue(value);
      debouncedUpdateSearch(value);
      debouncedUpdateEmptySearch(value);
    };

    const debouncedUpdateSearch = useCallback(
      debounce((searchValue) => {
        setSearch(searchValue);
        navigate(searchValue ? `/search/${searchValue}` : '/search');
      }, 300),
      [setSearch, navigate],
    );

    const debouncedUpdateEmptySearch = useCallback(
      debounce((searchValue) => {
        if (searchValue === '') {
          setSearch('');
          navigate('/search');
        }
      }, 300),
      [setSearch, navigate],
    );

    useEffect(() => {
      if (name) {
        setInputValue(name!);
        setSearch(name!);
      }
    }, []);

    return (
      <VStack
        w={'100%'}
        position={'sticky'}
        top={'0'}
        backgroundColor={'#111111'}
        padding={'12px'}
        borderRadius={'8px 8px 0px 0px'}
      >
        <HStack w={'100%'} padding={'12px'} justifyContent={'center'}>
          <HStack width={'100%'} justifyContent={'flex-start'}>
            <VStack backgroundColor={'#191919'} borderRadius={'100px'}>
              <Icon
                as={MdKeyboardArrowLeft}
                color={inputValue.length > 0 ? '#ffffff' : '#959595'}
                cursor={inputValue.length > 0 ? 'pointer' : 'normal'}
                boxSize={'34px'}
                onClick={() => {
                  handleResetSearch();
                  handleNavigateBack();
                }}
              />
            </VStack>
            <VStack backgroundColor={'#191919'} borderRadius={'100px'}>
              <Icon
                as={MdKeyboardArrowRight}
                color={lastInput.length > 0 ? '#ffffff' : '#959595'}
                cursor={lastInput.length > 0 ? 'pointer' : 'normal'}
                boxSize={'34px'}
                onClick={() => {
                  setInputValue(lastInput);
                  updateSearch(lastInput);
                }}
              />
            </VStack>
            <Input
              ref={inputRef}
              autoFocus
              color={'#ffffff'}
              {...rest}
              value={inputValue}
              onChange={handleChange}
              w={{ base: '300px', sm: '300px', md: '400px' }}
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
        <HStack
          w={'100%'}
          gap={'12px'}
          padding={{ base: '0px', sm: '0px', md: '0px 24px 0px 24px' }}
        >
          <HStack
            h={'30px'}
            w={'50px'}
            cursor={'pointer'}
            borderRadius={'28px'}
            justifyContent={'center'}
            onClick={() => handleClickMusicType(GetMusicType.ALL)}
            backgroundColor={applyMusicTypeBackground(GetMusicType.ALL)}
          >
            <Text
              fontSize={'12px'}
              as={'b'}
              color={applyMusicTypeColor(GetMusicType.ALL)}
            >
              All
            </Text>
          </HStack>
          <HStack
            h={'30px'}
            w={'80px'}
            cursor={'pointer'}
            borderRadius={'28px'}
            justifyContent={'center'}
            onClick={() => handleClickMusicType(GetMusicType.ARTISTS)}
            backgroundColor={applyMusicTypeBackground(GetMusicType.ARTISTS)}
          >
            <Text
              fontSize={'12px'}
              as={'b'}
              color={applyMusicTypeColor(GetMusicType.ARTISTS)}
            >
              Artists
            </Text>
          </HStack>
          <HStack
            h={'30px'}
            w={'80px'}
            cursor={'pointer'}
            borderRadius={'28px'}
            justifyContent={'center'}
            onClick={() => handleClickMusicType(GetMusicType.ALBUMS)}
            backgroundColor={applyMusicTypeBackground(GetMusicType.ALBUMS)}
          >
            <Text
              fontSize={'12px'}
              as={'b'}
              color={applyMusicTypeColor(GetMusicType.ALBUMS)}
            >
              Albums
            </Text>
          </HStack>
          <HStack
            h={'30px'}
            w={'80px'}
            cursor={'pointer'}
            borderRadius={'28px'}
            justifyContent={'center'}
            onClick={() => handleClickMusicType(GetMusicType.SONGS)}
            backgroundColor={applyMusicTypeBackground(GetMusicType.SONGS)}
          >
            <Text
              fontSize={'12px'}
              as={'b'}
              color={applyMusicTypeColor(GetMusicType.SONGS)}
            >
              Songs
            </Text>
          </HStack>
          <HStack
            h={'30px'}
            w={'70px'}
            justifyContent={'center'}
            borderRadius={'28px'}
            cursor={'pointer'}
            backgroundColor={applyMusicTypeBackground(GetMusicType.PLAYLISTS)}
            onClick={() => handleClickMusicType(GetMusicType.PLAYLISTS)}
          >
            <Text
              fontSize={'12px'}
              as={'b'}
              color={applyMusicTypeColor(GetMusicType.PLAYLISTS)}
            >
              Playlist
            </Text>
          </HStack>
        </HStack>
      </VStack>
    );
  },
);
