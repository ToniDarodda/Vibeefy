import { Text, VStack, Image, HStack, Icon } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { GoPlus } from 'react-icons/go';
import { MdFavorite } from 'react-icons/md';

import { ArtistBar } from '../components/topBar/artistBar';
import { useAudioPlayerContext } from '../contexts';
import { formatTime } from '../utils';
import { truncateText } from '../utils/truncatText';
import { useGetArtistInfo } from '../query/artist';
import { useModalProvider } from '../contexts/modal.context';
import { SongInterface } from '../interfaces';
import { AlbumInfo } from '../interfaces/album';

export function Artist() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reducedView, setReducedView] = useState<boolean>(false);
  const [clickedAlbum, setClickedAlbum] = useState<AlbumInfo>();
  const [isModalAlbumQueueOpen, setIsModalAlbumQueueOpen] =
    useState<boolean>(false);
  const { mouseCoord, setMouseCoord, calculateModalCoordX } =
    useModalProvider();
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);

  const [songDisplayLimit, setSongDisplayLimit] = useState<number>(5);
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    setCurrentSong,
    currentSong,
    isPaused,
    setIsListening,
    addAlbumToQueue,
  } = useAudioPlayerContext();

  const { data: artist } = useGetArtistInfo(id ?? '');

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

  const handleNavigateAlbum = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalAlbumQueueOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <VStack w={'100%'} h={'100%'}>
      <VStack w={'100%'} h={'100%'} backgroundColor={'#121212'}>
        <ArtistBar artist={artist!} reducedView={reducedView} />

        <VStack
          w={'100%'}
          overflowY="auto"
          onScroll={handleScroll}
          h={'100%'}
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
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  padding={'8px'}
                  borderRadius={'8px'}
                  cursor={'pointer'}
                  _hover={{
                    backgroundColor: '#191919',
                  }}
                  onClick={() => {
                    setIsListening(true);
                    setCurrentSong(song);
                  }}
                >
                  <HStack gap={'12px'}>
                    <Text minW={'10px'} color={'#7a7a7a'}>
                      {index + 1}
                    </Text>
                    <Image
                      src={
                        currentSong?.id === song.id
                          ? isPaused
                            ? '/pause.gif'
                            : '/playing.gif'
                          : song.thumbnails ?? ''
                      }
                      boxSize={'50px'}
                      borderRadius={'4px'}
                    />
                    <Text>{truncateText(song.title.split('(')[0], 15)}</Text>
                  </HStack>
                  <Text color={'#7a7a7a'}>{formatTime(song.songDuration)}</Text>
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

          <HStack w={'100%'} maxW={'100%'} gap={'20px'} flexWrap={'wrap'}>
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
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setMouseCoord({
                        clientX: e.clientX,
                        clientY: e.clientY,
                      });
                      setClickedAlbum(album);
                      setIsModalAlbumQueueOpen(true);
                    }}
                    onClick={() => handleNavigateAlbum(album.id)}
                  >
                    <VStack w={'100%'}>
                      <Image
                        src={album.thumbnails}
                        boxSize={'220px'}
                        borderRadius={'8px'}
                      />
                    </VStack>
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
            w={{ base: '100%', md: '80%', lg: '70%', xl: '60%' }}
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
      {isModalAlbumQueueOpen && (
        <VStack
          w={'220px'}
          h={'120px'}
          ref={modalRef}
          backgroundColor={'#282828'}
          borderRadius={'4px'}
          padding={'4px'}
          position={'absolute'}
          alignItems={'flex-start'}
          top={mouseCoord.clientY}
          left={calculateModalCoordX(mouseCoord.clientX, modalRef)}
        >
          <HStack
            w={'100%'}
            h={'40px'}
            _hover={{ backgroundColor: '#3e3d3d' }}
            cursor={'pointer'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            paddingLeft={'8px'}
            onClick={() => {
              if (clickedAlbum) {
                const changeAlbum: SongInterface[] = clickedAlbum.songs.map(
                  (song) => {
                    return {
                      id: song.id,
                      songDuration: song.songDuration,
                      thumbnails: song.thumbnails,
                      title: song.title,
                      videoId: song.videoId,
                      albumName: clickedAlbum.title,
                      trackNumber: song.trackNumber,
                    };
                  },
                );
                addAlbumToQueue(changeAlbum);
              }
              setIsModalAlbumQueueOpen(false);
            }}
          >
            <Icon as={MdOutlineQueueMusic} boxSize={'24px'} color={'#a7a7a7'} />
            <Text fontSize={'14px'}>Add to queue</Text>
          </HStack>
          <HStack
            w={'100%'}
            h={'40px'}
            _hover={{ backgroundColor: '#3e3d3d' }}
            cursor={'pointer'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            paddingLeft={'8px'}
          >
            <Icon as={GoPlus} w={'40px'} boxSize={'24px'} color={'#a7a7a7'} />
            <Text fontSize={'14px'}>Add to playlist</Text>
          </HStack>
          <HStack
            w={'100%'}
            h={'40px'}
            _hover={{ backgroundColor: '#3e3d3d' }}
            cursor={'pointer'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            paddingLeft={'8px'}
          >
            <Icon
              as={MdFavorite}
              w={'40px'}
              boxSize={'24px'}
              color={'#a7a7a7'}
            />
            <Text fontSize={'14px'}>Add to Your Library (NI)</Text>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
}
