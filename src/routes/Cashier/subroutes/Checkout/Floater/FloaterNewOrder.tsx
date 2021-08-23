import {
  Flex,
  HStack,
  Heading,
  Tag,
  Spacer,
  Button,
  Stack,
  Input,
  Image,
  Text,
  useNumberInput,
  Box,
  Avatar,
  IconButton,
  InputGroup,
  InputLeftElement,
  ButtonGroup,
  Grid,
  Center,
} from "@chakra-ui/react";
import useModalContext from "context/useModalContext";
import React from "react";
import { RiDraftLine, RiAddLine } from "react-icons/ri";
import { MODAL_CASHIER_ID } from "routes/Cashier/constants/modal";

interface Props {}

const FloaterNewOrder = () => {
  const { modalState, modalAct } = useModalContext();

  return (
    <>
      <Box
        shadow="dark-lg"
        rounded="lg"
        pos="fixed"
        zIndex="10"
        px="3"
        py="3"
        bottom={{
          base: "72px",
          md: "8",
        }}
        right={{
          base: "2.5vw",
          md: "12",
        }}
        w="95vw"
        maxW="500px"
        bg="white"
        userSelect="none"
        cursor="pointer"
      >
        <HStack w="full">
          <Button
            flexGrow={1}
            size="lg"
            leftIcon={<RiAddLine size={24} />}
            colorScheme="red"
            onClick={() => {
              modalAct.openModal({ id: MODAL_CASHIER_ID.INPUT_CUSTOMER });
            }}
          >
            Add Order
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default FloaterNewOrder;
