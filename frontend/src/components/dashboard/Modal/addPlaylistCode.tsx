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
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa6';

export function ModalPlaylistCode() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Icon
        as={FaPlus}
        color={'#535353'}
        boxSize={'24px'}
        cursor={'pointer'}
        _hover={{
          color: '#ffffff',
        }}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
            <Input placeholder="Playlist code generated"></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button backgroundColor={'orange'} color={'#ffffff'}>
              Add playlist
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
