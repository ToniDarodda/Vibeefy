import { VStack, HStack, Text, Icon, useToast } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { MdDelete, MdAddToQueue, MdShare } from 'react-icons/md';
import { useDeletePlaylist, useGenerateCode } from '../../query';
import { BasePlaylistInterface } from '../../interfaces';

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
  const toast = useToast({
    containerStyle: {
      marginBottom: '20px',
    },
  });

  const componentRef = useRef<HTMLDivElement>(null);
  const { mutate: generateCode, data: generatedCode } = useGenerateCode();

  const calculateModalCoordX = (clientX: number) => {
    const { innerWidth: width } = window;
    const componentSize = componentRef.current?.offsetWidth ?? 100;

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

  const handlePlaylistShare = async () => {
    generateCode(selectedPl.id);
  };

  useEffect(() => {
    if (generatedCode === undefined) return;

    const handleCodeChange = async () => {
      try {
        await navigator.clipboard.writeText(generatedCode!);
        toast({
          title: 'Code copied to clipboard.',
          status: 'info',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      } catch (err) {
        console.log(err);
      }
    };

    handleCodeChange();
  }, [generatedCode]);

  return (
    <>
      {isModalPlaylistOptionOpen && (
        <VStack
          w={'200px'}
          h={'200px'}
          zIndex={'2'}
          position={'absolute'}
          top={mooseCoord.clientY}
          left={calculateModalCoordX(mooseCoord.clientX)}
        >
          <VStack
            w={'100%'}
            padding={'4px'}
            ref={componentRef}
            borderRadius={'4px'}
            alignItems={'flex-start'}
            backgroundColor={'#282828'}
          >
            <HStack
              w={'100%'}
              h={'40px'}
              gap={'12px'}
              cursor={'pointer'}
              paddingLeft={'8px'}
              _hover={{ backgroundColor: '#3e3d3d' }}
            >
              <Icon as={FaPencilAlt} color={'#c8c8c89c'} boxSize={'24px'} />
              <Text fontSize={'14px'}>Update playlist</Text>
            </HStack>
            <HStack
              w={'100%'}
              h={'40px'}
              gap={'12px'}
              paddingLeft={'8px'}
              cursor={'pointer'}
              _hover={{ backgroundColor: '#3e3d3d' }}
            >
              <Icon as={MdDelete} color={'#c8c8c89c'} boxSize={'24px'} />
              <Text fontSize={'14px'} onClick={handlePlaylistdelete}>
                Delete playlist
              </Text>
            </HStack>
            <HStack
              w={'100%'}
              h={'40px'}
              gap={'12px'}
              cursor={'pointer'}
              paddingLeft={'8px'}
              _hover={{ backgroundColor: '#3e3d3d' }}
            >
              <Icon as={MdShare} color={'#c8c8c89c'} boxSize={'24px'} />
              <Text fontSize={'14px'} onClick={handlePlaylistShare}>
                Share playlist
              </Text>
            </HStack>
            <VStack w={'100%'} borderBottom={'1px solid #82828267'} />
            <HStack
              w={'100%'}
              h={'40px'}
              gap={'12px'}
              cursor={'pointer'}
              paddingLeft={'8px'}
              _hover={{ backgroundColor: '#3e3d3d' }}
            >
              <Icon as={MdAddToQueue} color={'#c8c8c89c'} boxSize={'24px'} />
              <Text fontSize={'14px'}>Add to queue</Text>
            </HStack>
          </VStack>
        </VStack>
      )}
    </>
  );
}
