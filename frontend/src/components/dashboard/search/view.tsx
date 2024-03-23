/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react';
import { VStack, HStack, Text, Image, useMediaQuery } from '@chakra-ui/react';

import { SearchBar } from '../searchBar';
import {
  AlbumInterface,
  SearchResponse,
  BasePlaylistInterface,
} from '../../../interfaces';
import { NoDataSearch } from './noDataSearch';
import { TopResultSearch } from './topResultSearch';
import { SongSearch } from './songSearch';
import { ArtistSearch } from './artistSearch';
import { AlbumSearch } from './albumSearch';
import { useGetAlbum } from '../../../query';
import { MakePictureLarger } from '../../../utils/formatPicture';
import {
  ViewStateEnum,
  useViewStateContext,
} from '../../../contexts/viewState.context';

interface SearchViewInterface {
  search: string;
  searchValue: SearchResponse[] | undefined;
  setSelectedAlbumOrSong: Dispatch<
    SetStateAction<AlbumInterface | BasePlaylistInterface | undefined>
  >;
  inputRef: RefObject<HTMLInputElement>;

  setSearch: Dispatch<SetStateAction<string>>;
  setSelectedArtist: Dispatch<SetStateAction<string>>;
}

export function SearchView({
  search,
  inputRef,
  setSearch,
  searchValue,
  setSelectedArtist,
  setSelectedAlbumOrSong,
}: SearchViewInterface) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { viewState, setViewState } = useViewStateContext();

  const { data: albums } = useGetAlbum(search, 20, 0);
  const [isLargardThan800] = useMediaQuery('(min-width: 800px)');

  return (
    <VStack
      h={'100%'}
      w={'100%'}
      display={viewState === ViewStateEnum.SELECTEDARTIST ? 'none' : 'flex'}
    >
      {(viewState === ViewStateEnum.ARTISTS ||
        viewState === ViewStateEnum.SEARCH) && (
        <SearchBar setSearch={setSearch} search={search} inputRef={inputRef} />
      )}
      {viewState === ViewStateEnum.SEARCH && (
        <HStack
          marginTop={{ base: '100px', sm: '110px', md: '154px', lg: '160px' }}
          height="100%"
          w={'100%'}
          gap={'20px'}
          padding={'24px'}
        >
          {albums?.length === 0 && <NoDataSearch albums={albums} />}
          {search && albums && albums?.length !== 0 && (
            <VStack w={'100%'} gap={'20px'}>
              <HStack w={'100%'}>
                <TopResultSearch
                  albums={albums}
                  setSelectedArtist={setSelectedArtist}
                />
                <SongSearch albums={albums} />
              </HStack>
              <ArtistSearch
                albums={albums}
                setSelectedArtist={setSelectedArtist}
              />
              <AlbumSearch
                albums={albums}
                setSelectedAlbumOrSong={setSelectedAlbumOrSong}
              />
            </VStack>
          )}
        </HStack>
      )}
      {viewState === ViewStateEnum.ARTISTS && (
        <VStack w={'100%'} h={'100%'} ref={containerRef} gap={'20px'}>
          <HStack
            w={'100%'}
            h={'100%'}
            flexWrap={'wrap'}
            gap={'30px'}
            justifyContent={'center'}
          >
            {albums
              ?.filter(
                (album, index, self) =>
                  index ===
                  self.findIndex((t) => t.artist.name === album.artist.name),
              )
              .map((album: AlbumInterface, index) => {
                return (
                  <VStack
                    key={index}
                    w={'auto'}
                    h={'auto'}
                    cursor={'pointer'}
                    _hover={{
                      backgroundColor: '#191919',
                    }}
                    borderRadius={'8px'}
                    padding={'12px'}
                    onClick={() => {
                      setSelectedArtist(album.artist.id);
                      setViewState(ViewStateEnum.SELECTEDARTIST);
                    }}
                  >
                    <Image
                      src={MakePictureLarger(album)}
                      boxSize={'200px'}
                      borderRadius={'100px'}
                    />
                    <Text>{album.artist.name}</Text>
                  </VStack>
                );
              })}
          </HStack>
        </VStack>
      )}
    </VStack>
  );
}
