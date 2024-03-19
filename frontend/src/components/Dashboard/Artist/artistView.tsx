import { Text, VStack, Image, HStack } from '@chakra-ui/react';

import {
  ViewStateEnum,
  useViewStateContext,
} from '../../../contexts/viewState.context';
import { useGetArtistInfo } from '../../../query/artist';
import { Dispatch, SetStateAction, useState } from 'react';
import { formatTime } from '../../../utils';
import { truncateText } from '../../../utils/truncatText';
import { AlbumInterface, BasePlaylistInterface } from '../../../interfaces';
import { ArtistBar } from './artistBar';

interface ArtistViewInterface {
  selectedArtist: string;

  setSelectedAlbumOrSong: Dispatch<
    SetStateAction<AlbumInterface | BasePlaylistInterface | undefined>
  >;
}

export function ArtistView({
  selectedArtist,
  setSelectedAlbumOrSong,
}: ArtistViewInterface) {
  const [reducedView, setReducedView] = useState<boolean>(false);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);

  const [songDisplayLimit, setSongDisplayLimit] = useState<number>(5);

  const { viewState, setViewState } = useViewStateContext();

  const { data: artist } = useGetArtistInfo(selectedArtist);

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    const scrollDelta = 100;

    if (scrollTop > lastScrollTop && scrollTop > scrollDelta) {
      setReducedView(true);
    }

    if (scrollTop === 0) {
      setReducedView(false);
    }

    setLastScrollTop(scrollTop);
  };

  const showMoreSongs = () => {
    setSongDisplayLimit(10);
  };

  const showLessSongs = () => {
    setSongDisplayLimit(5);
  };

  return (
    <>
      {viewState === ViewStateEnum.SELECTEDARTIST && (
        <VStack w={'100%'} h={'100%'}>
          <ArtistBar artist={artist!} reducedView={reducedView} />

          <VStack
            w={'100%'}
            overflowY="auto"
            onScroll={handleScroll}
            maxH={'800px'}
            gap={'16px'}
            padding={'24px'}
            alignItems={'flex-start'}
          >
            <Text fontSize={'20px'} as={'b'}>
              Popular
            </Text>
            {artist?.albums
              .sort((a, b) => +b.year - +a.year)[0]
              .songs.slice(0, songDisplayLimit)
              .map((song, index) => {
                return (
                  <HStack
                    key={index}
                    w={'100%'}
                    alignItems={'flex-start'}
                    justifyContent={'space-between'}
                  >
                    <HStack gap={'12px'}>
                      <Text w={'20px'} color={'#7a7a7a'}>
                        {index + 1}
                      </Text>
                      <Image
                        src={song.thumbnails}
                        boxSize={'50px'}
                        borderRadius={'4px'}
                      ></Image>
                      <Text>{song.title}</Text>
                    </HStack>
                    <Text color={'#7a7a7a'}>
                      {formatTime(song.songDuration)}
                    </Text>
                  </HStack>
                );
              })}
            <Text
              as={'b'}
              cursor={'pointer'}
              _hover={{
                color: '#d1d1d1',
              }}
              color={'#7a7a7a'}
              marginBottom={'50px'}
              onClick={songDisplayLimit === 5 ? showMoreSongs : showLessSongs}
            >
              {songDisplayLimit === 5 ? 'See more' : 'See less'}
            </Text>

            <Text fontSize={'20px'} as={'b'}>
              Discography
            </Text>

            <HStack
              w={'100%'}
              h={'100%'}
              gap={'20px'}
              minH={'300px'}
              overflow={'scroll'}
            >
              {artist?.albums
                .sort((a, b) => +b.year - +a.year)
                .map((album, index) => {
                  return (
                    <VStack
                      key={index}
                      padding={'12px'}
                      minW={'250px'}
                      minH={'300px'}
                      _hover={{
                        backgroundColor: '#191919',
                      }}
                      alignItems={'flex-start'}
                      borderRadius={'8px'}
                      cursor={'pointer'}
                      onClick={() => {
                        setSelectedAlbumOrSong({
                          ...album,
                          artist: {
                            id: artist.id,
                            artistYoutubeId: artist.artistYoutubeId,
                            description: artist.description,
                            name: artist.name,
                            profilePicture: artist.profilePicture,
                            thumbnails: artist.thumbnails,
                          },
                        });
                        setViewState(ViewStateEnum.ALBUM);
                      }}
                    >
                      <Image
                        src={album.thumbnails}
                        boxSize={'220px'}
                        borderRadius={'8px'}
                      />
                      {index === 0 ? 'Last release' + album.year : album.year}

                      <Text>{truncateText(album.title, 20)}</Text>
                      <Text color={'#7a7a7a'}>
                        {index === 0 ? 'Last release' : album.year} · Album
                      </Text>
                    </VStack>
                  );
                })}
            </HStack>
            <Text fontSize={'20px'} as={'b'}>
              About
            </Text>
            <VStack
              w={'60%'}
              minH={'600px'}
              borderRadius={'8px'}
              padding={'12px'}
              justifyContent={'flex-end'}
              backgroundImage={artist?.albums[0].thumbnails}
              backgroundSize={'cover'}
            >
              <Text textAlign={'center'}>
                {truncateText(artist?.albums[0]?.description ?? '', 400)}
              </Text>
            </VStack>
          </VStack>
        </VStack>
      )}
    </>
  );
}
