import { VStack, HStack, Text, Image } from '@chakra-ui/react';

import { SearchBar } from './searchBar';
import {
  AlbumInterface,
  SearchResponse,
  BasePlaylistInterface,
} from '../../../interfaces';

interface AlbumBoardInterface {
  albums: AlbumInterface[] | undefined;
  isSearching: boolean;
  searchValue: SearchResponse[] | undefined;
  setSearch: (b: string) => void;
  setSelectedAlbumOrSong: React.Dispatch<
    React.SetStateAction<AlbumInterface | BasePlaylistInterface | undefined>
  >;
  setPlaylistView: (b: boolean) => void;
}

export function AlbumBoard({
  albums,
  setSearch,
  isSearching,
  setPlaylistView,
  setSelectedAlbumOrSong,
}: AlbumBoardInterface) {
  return (
    <VStack flex={1} w={'100%'}>
      <SearchBar isSearching={isSearching} setSearch={setSearch} />
      <HStack
        flex={1}
        marginTop={'20px'}
        w={'100%'}
        gap={'20px'}
        flexWrap={'wrap'}
        justifyContent={'center'}
      >
        {Array.isArray(albums) &&
          albums?.map((data) => (
            <VStack
              key={data.id}
              w={{ base: '120px', sm: '150px', md: '200px' }}
              h={{ base: '120px', sm: '150px', md: '200px' }}
              cursor={'pointer'}
              borderRadius={'8px'}
              alignItems={'center'}
              justifyContent={'space-around'}
              padding={'4px'}
              _hover={{
                backgroundColor: '#3d3d3d33',
                textColor: '#ffffff',
              }}
              onClick={() => {
                setSelectedAlbumOrSong(data);
                setPlaylistView(true);
              }}
            >
              <Image
                src={data.thumbnails}
                alt={data.title}
                borderRadius={'8px'}
                boxSize={{ base: '40px', sm: '60px', md: '140px' }}
              />
              <Text
                overflow={'hidden'}
                textAlign={'center'}
                fontSize={'12px'}
                padding={'0px 0px 0px 24px'}
                alignSelf={'flex-start'}
              >
                {data.artist.name}
              </Text>
              <Text
                overflow={'hidden'}
                textAlign={'center'}
                padding={'0px 0px 0px 24px'}
                alignSelf={'flex-start'}
                fontSize={'14px'}
              >
                {data.title}
              </Text>
            </VStack>
          ))}
      </HStack>
    </VStack>
  );
}
