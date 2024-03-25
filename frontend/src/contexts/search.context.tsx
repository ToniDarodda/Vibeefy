import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

interface ViewStateProviderProps {
  children: ReactNode;
}

export enum GetMusicType {
  ALL = 'ALL',
  ARTISTS = 'ARTISTS',
  SONGS = 'SONGS',
  ALBUMS = 'ALBUMS',
  PLAYLISTS = 'PLAYLIST',
}

interface SearchContextInterface {
  search: string;
  inputValue: string;
  lastInput: string;
  musicType: GetMusicType;
  setInputValue: (tmp: string) => void;
  setSearch: (tmp: string) => void;
  handleResetSearch: () => void;
  handleLastSearch: () => void;
  setMusicType: (x: GetMusicType) => void;
  applyMusicTypeBackground: (x: GetMusicType) => string;
  applyMusicTypeColor: (x: GetMusicType) => string;
  handleClickMusicType: (x: GetMusicType) => void;
}

const defaultValue: SearchContextInterface = {
  search: '',
  inputValue: '',
  lastInput: '',
  musicType: GetMusicType.ALL,

  setMusicType: () => {},
  setInputValue: () => {},
  setSearch: () => {},
  handleResetSearch: () => {},
  handleLastSearch: () => {},
  applyMusicTypeBackground: () => '',
  applyMusicTypeColor: () => '',
  handleClickMusicType: () => {},
};

const SearchContext = createContext(defaultValue);

export const SearchProvider: FC<ViewStateProviderProps> = ({ children }) => {
  const [search, setSearch] = useState('');
  const [lastInput, setLastInput] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>(search);
  const [musicType, setMusicType] = useState<GetMusicType>(GetMusicType.ALL);

  const handleResetSearch = () => {
    setLastInput(search);
    setSearch('');
    setInputValue('');
  };

  const handleLastSearch = () => {
    if (lastInput.length > 0) {
      setInputValue(lastInput);
      setSearch(lastInput);
      setLastInput('');
    }
  };

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

  return (
    <SearchContext.Provider
      value={{
        search,
        inputValue,
        setSearch,
        handleResetSearch,
        handleLastSearch,
        setMusicType,
        musicType,
        applyMusicTypeBackground,
        applyMusicTypeColor,
        handleClickMusicType,
        setInputValue,
        lastInput,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchProvider = () => useContext(SearchContext);
