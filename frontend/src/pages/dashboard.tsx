import { useRef, useState } from 'react';
import { VStack, useMediaQuery } from '@chakra-ui/react';

import { SearchResponse } from '../interfaces/search';
import { SearchView } from '../components/Dashboard/Search/view';
import { Playbar } from '../components/Dashboard/Playbar/playBar';
import { PlaylistBar } from '../components/Dashboard/Sidebar/playlistQueueBar';
import { AlbumInterface } from '../interfaces/artist';
import { PlaylistType } from '../interfaces/playlist';
import { SelectionPanelView } from '../components/Dashboard/AlbumPlaylist/selectionPanelView';
import { useGetPlaylist } from '../query/playlist';
import { useGetSearch } from '../query';
import { ArtistView } from '../components/Dashboard/Artist/artistView';

export function Dashboard() {
  const [search, setSearch] = useState<string>('');
  const [selectedArtist, setSelectedArtist] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedAlbumOrSong, setSelectedAlbumOrSong] = useState<
    AlbumInterface | PlaylistType
  >();

  const { data: playlists } = useGetPlaylist();

  const [isLargardThan1000] = useMediaQuery('(min-width: 1000px)');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedSearchValue, setSelectedSearchValue] =
    useState<SearchResponse | null>(null);

  const { data: searchValue } = useGetSearch({
    query: 'search', // search value from the input top,
    filter: 'songs',
  }) as { data: SearchResponse[] | undefined };

  // const { data: linkValue } = useDownloadSong({
  //   link,
  //   download: false,
  // }) as { data: DownloadSongResponse | undefined };

  return (
    <VStack h={'100vh'} backgroundColor={'#000000'}>
      <VStack padding={'8px'} w={'100%'} h={'100%'}>
        <VStack
          flex={1}
          w={'100%'}
          overflow={'hidden'}
          overflowX={'hidden'}
          overflowY={'hidden'}
          flexDirection={'row'}
        >
          <VStack
            flex={4}
            h={'100%'}
            overflow={'auto'}
            borderRadius={'8px'}
            background="linear-gradient(45deg, rgba(0, 0, 0, 0.20) 2.92%, rgba(0, 0, 0, 0.00) 74.78%), #121212"
          >
            <SelectionPanelView
              playlists={playlists}
              details={selectedSearchValue}
              selectedAlbumOrSong={selectedAlbumOrSong as AlbumInterface}
            />
            <SearchView
              search={search}
              inputRef={inputRef}
              setSearch={setSearch}
              searchValue={searchValue}
              setSelectedArtist={setSelectedArtist}
              setSelectedAlbumOrSong={setSelectedAlbumOrSong}
            />
            <ArtistView
              selectedArtist={selectedArtist}
              setSelectedAlbumOrSong={setSelectedAlbumOrSong}
            />
          </VStack>
          <PlaylistBar
            inputRef={inputRef}
            setSearch={setSearch}
            playlists={playlists}
            isLargardThan1000={isLargardThan1000}
            setSelectedAlbumOrSong={setSelectedAlbumOrSong}
          />
        </VStack>
        <Playbar
          searchValue={searchValue}
          isLargerThan1000={isLargardThan1000}
          setSelectedAlbumOrSong={setSelectedAlbumOrSong}
        />
      </VStack>
    </VStack>
  );
}
