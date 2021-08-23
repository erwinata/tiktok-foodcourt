import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  Tag,
  Center,
  BoxProps,
  chakra,
  Input,
} from "@chakra-ui/react";
import React from "react";
import CartItem from "routes/Tenant/subroutes/Order/Cart/components/CartItem";
import {
  sampleCartItems,
  sampleCustomer,
} from "routes/Tenant/constants/samples";
import { IOrderItem } from "types/interfaces/IOrderItem";
import {
  RiCheckboxBlankLine,
  RiCheckboxCircleFill,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { motion } from "framer-motion";
import useModalContext from "context/useModalContext";
import useCartContext from "routes/Tenant/context/useCartContext";

// export const MotionBox = motion<BoxProps>(Box);
const MotionBox = chakra(motion.div);

interface Props {}

const ModalSaveDraft: React.FC<Props> = () => {
  const { modalState, modalAct } = useModalContext();
  const { cartState, cartAct } = useCartContext();

  const onClose = () => {
    modalAct.closeModal();
  };

  const submitCustomer = () => {
    cartAct.setCustomer(sampleCustomer);
    modalAct.closeModal();
  };

  return (
    <Modal onClose={onClose} isOpen isCentered>
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalHeader>Input Customer</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="4">
          <Stack align="center" textAlign="center">
            <Heading fontSize="lg">Scan Kartu Customer</Heading>
            <Box bg="black" h="300px" w="full"></Box>
            <Text color="gray.500">atau</Text>
            <Input
              type="tel"
              placeholder="Input ID Kartu Pelanggan"
              textAlign="center"
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Stack align="center" w="full">
            <Button
              colorScheme="red"
              onClick={submitCustomer}
              w="50%"
              size="lg"
            >
              OK
            </Button>
            <Button onClick={onClose}>Batal</Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalSaveDraft;
