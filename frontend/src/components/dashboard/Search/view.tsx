/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { VStack, HStack, Text, Image } from '@chakra-ui/react';

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

interface SearchViewInterface {
  search: string;
  isSearching: boolean;
  searchValue: SearchResponse[] | undefined;
  setSelectedAlbumOrSong: Dispatch<
    SetStateAction<AlbumInterface | BasePlaylistInterface | undefined>
  >;

  setSearch: Dispatch<SetStateAction<string>>;
  setPlaylistView: (b: boolean) => void;
}

export function SearchView({
  search,
  setSearch,
  searchValue,
  isSearching,
  setPlaylistView,
  setSelectedAlbumOrSong,
}: SearchViewInterface) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedArtistsCount, setLoadedArtistsCount] = useState<number>(20);

  const { data: albums } = useGetAlbum(search, loadedArtistsCount, 0);

  return (
    <VStack h={'100%'} w={'100%'}>
      <SearchBar
        isSearching={isSearching}
        setSearch={setSearch}
        search={search}
      />
      <HStack
        h={'100%'}
        marginTop={'20px'}
        w={'100%'}
        gap={'20px'}
        alignItems={'flex-start'}
        padding={'24px'}
      >
        {albums?.length === 0 && <NoDataSearch albums={albums} />}
        {search && albums && albums?.length !== 0 && (
          <VStack w={'100%'} gap={'20px'}>
            <HStack w={'100%'}>
              <TopResultSearch albums={albums} />
              <SongSearch albums={albums} />
            </HStack>
            <ArtistSearch albums={albums} />
            <AlbumSearch
              albums={albums}
              setPlaylistView={setPlaylistView}
              setSelectedAlbumOrSong={setSelectedAlbumOrSong}
            />
          </VStack>
        )}
        {search === '' && (
          <VStack
            w={'100%'}
            h={'100%'}
            ref={containerRef}
            padding={'24px'}
            marginTop={'20px'}
            overflow={'scroll'}
            gap={'20px'}
          >
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
      </HStack>
    </VStack>
  );
}
