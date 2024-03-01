import { VStack, HStack, Text, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SearchBar } from './searchBar';
import { SearchResponse } from '../../interfaces/search';

interface AlbumBoardInterface {
  setIsListening: (b: boolean) => void;
  isSearching: boolean;
  isLargardThan1000: boolean;
  setSongPlaying: (b: string) => void;
  setLink: (b: string) => void;
  searchValue: SearchResponse[] | undefined;
  search: string;
  setSearch: (b: string) => void;
  setThumbnail: (b: string) => void;
}

export function AlbumBoard({
  setIsListening,
  isSearching,
  setSongPlaying,
  setLink,
  searchValue,
  search,
  setSearch,
  setThumbnail,
}: AlbumBoardInterface) {
  const [searchData, setSearchData] = useState<SearchResponse[] | undefined>(
    [],
  );

  const activeListening = (title: string, link: string, thumbnail: string) => {
    setSongPlaying(title);
    if (!link || link === '') return;
    setLink(link);
    setIsListening(true);
    setThumbnail(thumbnail);
  };

  useEffect(() => {
    if (!search || search === '') return;
    setSearchData(searchValue);
  }, [search, searchValue]);

  return (
    <>
      <SearchBar isSearching={isSearching} setSearch={setSearch} />
      <VStack flex={1} w={'100%'} padding={'40px'}>
        <HStack
          flex={1}
          w={'100%'}
          gap={'20px'}
          flexWrap={'wrap'}
          justifyContent={'center'}
        >
          {searchData?.map((data, indx) => {
            return (
              <VStack
                key={indx}
                w={{
                  base: '120px',
                  sm: '150px',
                  md: '200px',
                }}
                h={{
                  base: '120px',
                  sm: '150px',
                  md: '200px',
                }}
                cursor={'pointer'}
                borderRadius={'8px'}
                backgroundColor={'#4e4e4e4e'}
                box-shadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                alignItems={'center'}
                justifyContent={'flex-end'}
                onClick={() =>
                  activeListening(data.title, data.link, data.thumbnails)
                }
              >
                <Image
                  src={data.thumbnails}
                  alt={data.title}
                  boxSize={{
                    base: '60px',
                    sm: '80px',
                    md: '120px',
                  }}
                />
                <Text color={'#ffffff'}>{data.title}</Text>
              </VStack>
            );
          })}
        </HStack>
      </VStack>
    </>
  );
}
