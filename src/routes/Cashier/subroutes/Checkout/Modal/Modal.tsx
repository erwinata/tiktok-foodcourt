import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
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
import { MODAL_CASHIER_ID } from "routes/Cashier/constants/modal";
import ModalCheckout from "routes/Cashier/subroutes/Checkout/Modal/ModalCheckout";
import ModalInputCustomer from "routes/Cashier/subroutes/Checkout/Modal/ModalInputCustomer";

// export const MotionBox = motion<BoxProps>(Box);
const MotionBox = chakra(motion.div);

interface Props {}

const Modal: React.FC<Props> = () => {
  const { modalState, modalAct } = useModalContext();

  return (
    <>
      {modalState.modal?.id === MODAL_CASHIER_ID.INPUT_CUSTOMER && (
        <ModalInputCustomer />
      )}
      {/* {modalState.modal?.id === MODAL_CASHIER_ID.LOAD_DRAFT && (
        <ModalLoadDraft />
      )} */}
      {modalState.modal?.id === MODAL_CASHIER_ID.ALERT_SUCCESS_CHECKOUT && (
        <ModalCheckout />
      )}
    </>
  );
};

export default Modal;
