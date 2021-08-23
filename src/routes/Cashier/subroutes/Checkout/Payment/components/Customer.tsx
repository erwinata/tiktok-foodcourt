import {
  Avatar,
  Box,
  Button,
  Circle,
  CloseButton,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Spacer,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CircleIcon from "components/CircleIcon";
import Form from "components/Form";
import useModalContext from "context/useModalContext";
import useThemeContext from "context/useThemeContext";
import { formatRp } from "helpers/numberFormatter";
import React, { useState } from "react";
import { RiAddLine, RiQrCodeLine } from "react-icons/ri";
import { MODAL_CASHIER_ID } from "routes/Cashier/constants/modal";
import useCheckoutContext from "routes/Cashier/context/useCheckoutContext";
import { ICustomer } from "types/interfaces/ICustomer";

interface Props {}

const Customer: React.FC<Props> = () => {
  const { modalAct } = useModalContext();
  const { themeHelpers } = useThemeContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { checkoutState, checkoutAct } = useCheckoutContext();
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  const [inputCardNumber, setInputCardNumber] = useState("");
  const [isConfirmReset, setIsConfirmReset] = useState(false);
  const { orders } = checkoutState.checkout;

  const submitCustomer = async () => {
    setIsLoadingCustomer(true);
    const isSuccess = await checkoutAct.submitCustomerCardId(inputCardNumber);
    if (isSuccess) {
      setInputCardNumber("");
    }
    setIsLoadingCustomer(false);
  };

  const resetCheckout = () => {
    checkoutAct.resetCheckout();
    setIsConfirmReset(false);
  };

  return (
    <Box py="2">
      <HStack py="2" px="4">
        <Heading size="md">Customer</Heading>
        <Spacer />
        {isConfirmReset ? (
          <HStack>
            <Button size="sm" colorScheme="red" onClick={resetCheckout}>
              Reset
            </Button>
            <Button size="sm" onClick={() => setIsConfirmReset(false)}>
              Batal
            </Button>
          </HStack>
        ) : (
          <Button size="sm" onClick={() => setIsConfirmReset(true)}>
            Reset
          </Button>
        )}
      </HStack>

      {orders.map((item, index) => (
        <HStack py="1" px="4" key={index}>
          <Avatar name={item.customer?.code} />
          <Box>
            <Text>{item.customer?.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {item.customer?.code}
            </Text>
          </Box>
          <Spacer />
          <Text fontWeight="bold">{formatRp(item.total)}</Text>
          <CloseButton
            onClick={() => checkoutAct.removeOrder(item.customer?.code || "")}
          />
        </HStack>
      ))}

      {themeHelpers.smScreen ? (
        <HStack
          py="2"
          px="4"
          mx="4"
          mt="2"
          borderWidth="2px"
          borderColor="gray.300"
          borderStyle="dashed"
          rounded="md"
          opacity="0.7"
          _hover={{
            opacity: "1",
          }}
          onClick={() => {
            modalAct.openModal({ id: MODAL_CASHIER_ID.INPUT_CUSTOMER });
          }}
        >
          <CircleIcon
            icon={<RiAddLine size="24px" />}
            size="40px"
            opacity="0.5"
          />
          <Text fontSize="lg" color="gray.500" flexGrow={1}>
            Tambah Customer
          </Text>
        </HStack>
      ) : (
        <Form onSubmit={submitCustomer}>
          <HStack py="1" px="4">
            <Avatar opacity="0.2" />
            <Input
              type="tel"
              placeholder="Input ID Kartu Pelanggan"
              value={inputCardNumber}
              onChange={(e) => setInputCardNumber(e.target.value)}
              readOnly={isLoadingCustomer}
            />
            <Button
              isLoading={isLoadingCustomer}
              leftIcon={<RiQrCodeLine size={24} />}
              onClick={() => {
                modalAct.openModal({ id: MODAL_CASHIER_ID.INPUT_CUSTOMER });
              }}
            >
              Scan
            </Button>
          </HStack>
        </Form>
      )}
    </Box>
  );
};

export default Customer;
