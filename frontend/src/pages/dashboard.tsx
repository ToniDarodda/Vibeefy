import { useState } from 'react';
import { VStack, useMediaQuery } from '@chakra-ui/react';

import { SearchResponse } from '../interfaces/search';
import { SearchView } from '../components/Dashboard/Search/view';
import { Playbar } from '../components/Dashboard/Playbar/playBar';
import { PlaylistBar } from '../components/Dashboard/Sidebar/playlistQueueBar';
import { AlbumInterface } from '../interfaces/artist';
import { PlaylistType } from '../interfaces/playlist';
import { SelectionPanelView } from '../components/Dashboard/selectionPanelView';
import { useGetPlaylist } from '../query/playlist';
import { useAudioPlayerContext } from '../contexts/playerContext';
import { useGetSearch } from '../query';

export function Dashboard() {
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [playlistView, setPlaylistView] = useState<boolean>(false);
  const [queueView, setQueueView] = useState<boolean>(false);

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

  const { togglePlayPause } = useAudioPlayerContext();

  return (
    <VStack
      h={'100vh'}
      backgroundColor={'#000000'}
      onContextMenu={(e) => e.stopPropagation()}
    >
      <VStack w={'100%'} h={'100%'} padding={'8px'}>
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
            {playlistView ? (
              <SelectionPanelView
                playlists={playlists}
                details={selectedSearchValue}
                setIsListening={setIsListening}
                setPlaylistView={setPlaylistView}
                selectedAlbumOrSong={selectedAlbumOrSong as AlbumInterface}
              />
            ) : (
              <SearchView
                isSearching={isSearching}
                searchValue={searchValue}
                setPlaylistView={setPlaylistView}
                setSelectedAlbumOrSong={setSelectedAlbumOrSong}
              />
            )}
          </VStack>
          <PlaylistBar
            playlists={playlists}
            queueView={queueView}
            setIsSearching={setIsSearching}
            setPlaylistView={setPlaylistView}
            isLargardThan1000={isLargardThan1000}
            setSelectedAlbumOrSong={setSelectedAlbumOrSong}
          />
        </VStack>
        <Playbar
          queueView={queueView}
          setQueueView={setQueueView}
          isListening={isListening}
          searchValue={searchValue}
          setIsSearching={setIsSearching}
          togglePlayPause={togglePlayPause}
          isLargerThan1000={isLargardThan1000}
        />
      </VStack>
    </VStack>
  );
}
