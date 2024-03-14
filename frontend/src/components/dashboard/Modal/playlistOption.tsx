import { VStack, HStack, Text, Icon } from '@chakra-ui/react';
import { useRef } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { MdDelete, MdAddToQueue } from 'react-icons/md';
import { useDeletePlaylist } from '../../../query';
import { BasePlaylistInterface } from '../../../interfaces';

interface PlaylistOption {
  isModalPlaylistOptionOpen: boolean;
  mooseCoord: { clientX: number; clientY: number };
  selectedPl: BasePlaylistInterface;
  setMouseCoord: (
    value: React.SetStateAction<{
      clientX: number;
      clientY: number;
    }>,
  ) => void;
}

export function ModalPlaylistOption({
  mooseCoord,
  selectedPl,
  isModalPlaylistOptionOpen,
}: PlaylistOption) {
  const componentRef = useRef<HTMLDivElement>(null);

  const calculateModalCoordX = (clientX: number) => {
    const { innerWidth: width } = window;
    const componentSize = componentRef.current?.offsetWidth ?? 0;
    if (clientX + componentSize > width) {
      return clientX - componentSize;
    }
    return clientX;
  };

  const { mutate: deletePlaylist } = useDeletePlaylist();

  const handlePlaylistdelete = () => {
    selectedPl.id;
    deletePlaylist(selectedPl.id);
  };

  return (
    <>
      {isModalPlaylistOptionOpen && (
        <VStack
          position={'absolute'}
          top={mooseCoord.clientY}
          left={calculateModalCoordX(mooseCoord.clientX)}
          zIndex={'2'}
        >
          <VStack
            backgroundColor={'#121212'}
            border={'1px solid #82828267'}
            ref={componentRef}
            gap={'12px'}
            alignItems={'flex-start'}
            padding={'20px'}
            borderRadius={'8px'}
          >
            <HStack
              _hover={{ color: '#ffffff', cursor: 'pointer' }}
              gap={'12px'}
            >
              <Icon as={FaPencilAlt} color={'#c8c8c89c'} />
              <Text
                color={'#ffffff9c'}
                fontSize={'14px'}
                _hover={{ color: '#ffffff' }}
                onClick={() => ''}
              >
                Update playlist
              </Text>
            </HStack>
            <HStack
              _hover={{ color: '#ffffff', cursor: 'pointer' }}
              gap={'12px'}
            >
              <Icon as={MdDelete} color={'#c8c8c89c'} />
              <Text
                color={'#ffffff9c'}
                fontSize={'14px'}
                _hover={{ color: '#ffffff' }}
                onClick={handlePlaylistdelete}
              >
                Delete playlist
              </Text>
            </HStack>
            <VStack w={'100%'} borderBottom={'1px solid #82828267'} />
            <HStack
              _hover={{ color: '#ffffff', cursor: 'pointer' }}
              gap={'12px'}
            >
              <Icon as={MdAddToQueue} color={'#c8c8c89c'} />
              <Text
                color={'#ffffff9c'}
                fontSize={'14px'}
                _hover={{ color: '#ffffff' }}
                onClick={() => ''}
              >
                Add to queue
              </Text>
            </HStack>
          </VStack>
        </VStack>
      )}
    </>
  );
}
