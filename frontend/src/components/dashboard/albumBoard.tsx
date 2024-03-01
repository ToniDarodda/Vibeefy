import { VStack, HStack, Text, Image } from '@chakra-ui/react';
import { SearchBar } from './searchBar';
import { SearchResponse } from '../../interfaces/search';

interface AlbumBoardInterface {
  setIsListening: (b: boolean) => void;
  isSearching: boolean;
  setSongPlaying: (b: string) => void;
  setLink: (b: string) => void;
  searchValue: SearchResponse[] | undefined;
  setSearch: (b: string) => void;
  setThumbnail: (b: string) => void;
}

export function AlbumBoard({
  setIsListening,
  isSearching,
  setSongPlaying,
  setLink,
  searchValue,
  setSearch,
  setThumbnail,
}: AlbumBoardInterface) {
  const activeListening = (title: string, link: string, thumbnail: string) => {
    setSongPlaying(title);
    if (!link || link === '') return;
    setLink(link);
    setIsListening(true);
    setThumbnail(thumbnail);
  };

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
        {Array.isArray(searchValue) &&
          searchValue?.map((data) => (
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
              onClick={() =>
                activeListening(data.title, data.link, data.thumbnails)
              }
            >
              <Image
                src={data.thumbnails}
                alt={data.title}
                borderRadius={'8px'}
                boxSize={{ base: '60px', sm: '80px', md: '120px' }}
              />
              <Text color={'#ffffff'} overflow={'hidden'} textAlign={'center'}>
                {data.title}
              </Text>
            </VStack>
          ))}
      </HStack>
    </VStack>
  );
}
