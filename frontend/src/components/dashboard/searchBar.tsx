import { RefObject, forwardRef, useEffect, useState } from 'react';
import { HStack, Input, Icon, VStack, Text } from '@chakra-ui/react';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdAccountCircle,
} from 'react-icons/md';
import {
  ViewStateEnum,
  useViewStateContext,
} from '../../contexts/viewState.context';

interface SearchBarInterface {
  search: string;
  inputRef: RefObject<HTMLInputElement>;

  setSearch: (b: string) => void;
}

enum GetMusicType {
  ALL = 'ALL',
  ARTISTS = 'ARTISTS',
  SONGS = 'SONGS',
  ALBUMS = 'ALBUMS',
  PLAYLISTS = 'PLAYLIST',
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarInterface>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ setSearch, search, inputRef, ...rest }, _ref) => {
    const [inputValue, setInputValue] = useState<string>(search);
    const [lastInput, setLastInput] = useState<string>('');
    const [musicType, setMusicType] = useState<GetMusicType>(GetMusicType.ALL);

    const { setViewState, viewState } = useViewStateContext();

    const applyMusicTypeBackground = (musicTypeValue: GetMusicType) => {
      if (musicType === musicTypeValue) {
        return '#ffffff';
      }
      return '#191919';
    };

    const applyMusicTypeColor = (musicTypeValue: GetMusicType) => {
      if (musicType === musicTypeValue) {
        return '#191919';
      }
      return '#ffffff';
    };

    const handleClickMusicType = (newMusicType: GetMusicType) => {
      if (musicType !== newMusicType) {
        setMusicType(newMusicType);
      }
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setSearch(inputValue);
        if (inputValue.length > 0 && viewState !== ViewStateEnum.SEARCH) {
          setViewState(ViewStateEnum.SEARCH);
        }
      }, 200);

      return () => clearTimeout(timeoutId);
    }, [inputValue, setSearch, viewState, setViewState]);

    useEffect(() => {
      if (search === '') {
        setInputValue('');
      }
    }, [viewState]);

    useEffect(() => {
      if (search === '') setViewState(ViewStateEnum.ARTISTS);
    }, [search]);

    return (
      <VStack
        w={'100%'}
        position={'sticky'}
        top={'0'}
        backgroundColor={'#111111'}
        padding={'12px'}
      >
        <HStack w={'100%'} padding={'12px'} justifyContent={'center'}>
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
        <HStack w={'100%'} gap={'12px'} padding={'0px 24px 0px 24px'}>
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
            w={'70px'}
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
            w={'70px'}
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
            w={'70px'}
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
