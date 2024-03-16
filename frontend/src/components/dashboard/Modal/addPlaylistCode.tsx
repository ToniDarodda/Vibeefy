import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Text,
  useDisclosure,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa6';
import { useCreatePlaylist, usePlaylistCode } from '../../../query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

type Inputs = {
  name: string;
  isPublic: boolean;
};

type InputCode = {
  code: string;
};

export function ModalPlaylistCode() {
  const toast = useToast();

  const {
    isOpen: isAddPlaylistOpen,
    onOpen: onAddPlaylistOpen,
    onClose: onAddPlaylistClose,
  } = useDisclosure();

  const {
    isOpen: isAddByCodeOpen,
    onOpen: onAddByCodeOpen,
    onClose: onAddByCodeClose,
  } = useDisclosure();

  const { register, handleSubmit } = useForm<Inputs>();
  const { register: registerCode, handleSubmit: handleSubmitCode } =
    useForm<InputCode>();

  const { mutate: createPlaylist } = useCreatePlaylist();

  const { mutate: addPlaylistWithCode, error, isError } = usePlaylistCode();

  const onSubmitCode: SubmitHandler<InputCode> = ({ code }: InputCode) => {
    addPlaylistWithCode(code);
    onAddByCodeClose();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createPlaylist(data);
    onAddPlaylistClose();
  };

  useEffect(() => {
    const axiosError = error as AxiosError;

    if (isError && axiosError) {
      toast({
        title: 'Error',
        description: `Code doesn't exist`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isError, error, toast]);

  return (
    <>
      <Menu>
        <MenuButton
          border={'none'}
          as={IconButton}
          _hover={{
            backgroundColor: 'none',
          }}
          aria-label="Options"
          icon={
            <Icon
              as={FaPlus}
              color={'#535353'}
              boxSize={'24px'}
              cursor={'pointer'}
              _hover={{
                color: '#ffffff',
              }}
            />
          }
          variant="outline"
        />
        <MenuList>
          <MenuItem icon={<AddIcon />} onClick={onAddPlaylistOpen}>
            New Playlist
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} onClick={onAddByCodeOpen}>
            Add Playlist with code
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isAddByCodeOpen} onClose={onAddByCodeClose} isCentered>
        <ModalOverlay />
        <ModalContent
          backgroundColor={'#191919'}
          color={'#ffffff'}
          gap={'12px'}
        >
          <ModalHeader>Add your friends playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody gap={'120px'}>
            <Text margin={'0px 0px 8px 0px'}>Playlist code</Text>
            <Input
              placeholder="Playlist code generated"
              {...registerCode('code', { required: true })}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="ghost" mr={3} onClick={onAddByCodeClose}>
              Close
            </Button>
            <Button
              backgroundColor={'orange'}
              color={'#ffffff'}
              onClick={handleSubmitCode(onSubmitCode)}
            >
              Add playlist
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isAddPlaylistOpen} onClose={onAddPlaylistClose} isCentered>
        <ModalOverlay />
        <ModalContent
          backgroundColor={'#191919'}
          color={'#ffffff'}
          gap={'12px'}
        >
          <ModalHeader>Create your playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w={'100%'} gap={'12px'}>
              <VStack alignItems={'flex-start'} w={'100%'}>
                <Text margin={'0px 0px 8px 0px'}>Playlist name</Text>
                <Input
                  placeholder="Playlist name..."
                  {...register('name', { required: true })}
                ></Input>
              </VStack>

              <VStack alignItems={'flex-start'} w={'100%'}>
                <Text>Make your playlist public?</Text>
                <Switch
                  size="lg"
                  colorScheme="orange"
                  {...register('isPublic')}
                />
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="ghost" mr={3} onClick={onAddPlaylistClose}>
              Close
            </Button>
            <Button
              backgroundColor={'orange'}
              color={'#ffffff'}
              onClick={handleSubmit(onSubmit)}
            >
              Create playlist
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
