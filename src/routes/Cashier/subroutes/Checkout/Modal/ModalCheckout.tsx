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
} from "@chakra-ui/react";
import React from "react";
import CartItem from "routes/Cashier/subroutes/Checkout/Payment/components/CartItem";
import { sampleCartItems } from "routes/Cashier/constants/samples";
import { IOrderItem } from "types/interfaces/IOrderItem";
import {
  RiCheckboxBlankLine,
  RiCheckboxCircleFill,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { motion } from "framer-motion";
import useModalContext from "context/useModalContext";

// export const MotionBox = motion<BoxProps>(Box);
const MotionBox = chakra(motion.div);

interface Props {}

const ModalCheckout: React.FC<Props> = () => {
  const { modalState, modalAct } = useModalContext();

  const onClose = () => {
    modalAct.closeModal();
  };

  return (
    <Modal onClose={onClose} isOpen isCentered>
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalBody py="10">
          <Stack align="center" textAlign="center">
            <MotionBox
              color="green.400"
              animate={{ rotate: 0, scale: 1 }}
              initial={{ rotate: -120, scale: 1.2 }}
            >
              <RiCheckboxCircleFill size={200} />
            </MotionBox>
            <Heading fontSize="2xl">Checkout Berhasil</Heading>
            <Text px="4">
              Untuk melihat status pembayaran, silahkan ke Riwayat Order
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Center w="full">
            <Button onClick={onClose}>Tutup</Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCheckout;
