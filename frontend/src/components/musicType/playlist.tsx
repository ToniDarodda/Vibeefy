/* eslint-disable @typescript-eslint/no-unused-vars */
import { VStack, Text, HStack, Image } from '@chakra-ui/react';
import { GetMusicType, useSearchProvider } from '../../contexts/search.context';
import { useNavigate } from 'react-router-dom';
import { useGetAlbumBySongId, useGetPublicPlaylist } from '../../query';
import { MakePictureLargerWithImageLink, truncateText } from '../../utils';
import { AlbumInterfaceWithSongs } from '../../interfaces';

export function MusicTypePlaylist() {
  const navigate = useNavigate();

  const { musicType } = useSearchProvider();
  const { data: publicPlaylists } = useGetPublicPlaylist();

  const handleNavigatePlaylist = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };

  const firstSongIds =
    publicPlaylists && publicPlaylists.length > 0
      ? publicPlaylists
          .map((playlist) => playlist?.playlistSongs[0]?.songId)
          .filter(Boolean)
      : [''];
  const albumInfoQueries = useGetAlbumBySongId(firstSongIds);

  return (
    <>
      {musicType === GetMusicType.PLAYLISTS && publicPlaylists && (
        <HStack
          w={'100%'}
          h={'100%'}
          flexWrap={'wrap'}
          alignItems={'flex-start'}
        >
          {publicPlaylists?.map((playlist, index) => {
            const album = albumInfoQueries
              ? albumInfoQueries[index]?.data
              : undefined;
            const thumbnailSrc = album?.thumbnails ?? '/vinyl.png';

            return (
              <VStack
                key={index}
                padding={'16px'}
                cursor={'pointer'}
                borderRadius={'4px'}
                maxW={'216px'}
                alignItems={'flex-start'}
                _hover={{
                  backgroundColor: '#1a1a1a',
                }}
                onClick={() => handleNavigatePlaylist(playlist.id)}
              >
                <Image
                  src={MakePictureLargerWithImageLink(thumbnailSrc)}
                  boxSize={'180px'}
                  borderRadius={'4px'}
                  objectFit={'cover'}
                />
                <Text>{truncateText(playlist.name, 16)}</Text>
                <Text color={'#a7a7a7'}>{playlist.user.pseudo}</Text>
              </VStack>
            );
          })}
        </HStack>
      )}
    </>
  );
}
