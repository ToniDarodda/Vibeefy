/* eslint-disable @typescript-eslint/no-unused-vars */
import { VStack, HStack, Text, Image } from '@chakra-ui/react';

import { SearchBar } from './searchBar';
import { SearchResponse } from '../../../interfaces/search';
import { useGetAlbum } from '../../../query/album';
import { useState } from 'react';
import { AlbumInterface, SongInterface } from '../../../interfaces/artist';
import { BasePlaylistInterface } from '../../../interfaces/playlist';

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
              backgroundColor={'#4e4e4e4e'}
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
              alignItems={'center'}
              justifyContent={'space-around'}
              padding={'4px'}
              onClick={() => {
                setSelectedAlbumOrSong(data);
                setPlaylistView(true);
              }}
            >
              <Image
                src={data.thumbnails}
                alt={data.title}
                borderRadius={'8px'}
                boxSize={{ base: '40px', sm: '60px', md: '120px' }}
              />
              <Text
                color={'#ffffff'}
                overflow={'hidden'}
                textAlign={'center'}
                fontSize={'12px'}
              >
                {data.artist.name}
              </Text>
              <Text
                color={'#ffffff'}
                overflow={'hidden'}
                textAlign={'center'}
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
