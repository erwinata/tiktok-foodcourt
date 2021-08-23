import {
  Avatar,
  Box,
  Button,
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
import Form from "components/Form";
import useModalContext from "context/useModalContext";
import React, { useState } from "react";
import { RiAddLine, RiQrCodeLine } from "react-icons/ri";
import { MODAL_TENANT_ID } from "routes/Tenant/constants/modal";
import useCartContext from "routes/Tenant/context/useCartContext";
import useTenantContext from "routes/Tenant/context/useTenantContext";

interface Props {}

const Customer: React.FC<Props> = () => {
  const { modalAct } = useModalContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cartState, cartAct } = useCartContext();
  const { tenantState } = useTenantContext();
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  const [inputCardNumber, setInputCardNumber] = useState("");
  const [isConfirmRemoveCustomer, setIsConfirmRemoveCustomer] = useState(false);
  const customer = cartState.order.customer;

  const submitCustomer = async () => {
    setIsLoadingCustomer(true);
    const isSuccess = await cartAct.submitCustomerCardId(
      inputCardNumber,
      tenantState.customerCardIDs
    );
    if (isSuccess) {
      setInputCardNumber("");
    }
    setIsLoadingCustomer(false);
  };

  return (
    <Box py="2">
      <HStack py="2" px="4">
        <Heading size="md">Customer</Heading>
      </HStack>

      {customer ? (
        <HStack py="1" px="4">
          <Avatar name={customer?.code} />
          <Box>
            <Text>{customer?.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {customer?.code}
            </Text>
          </Box>
          <Spacer />
          <CloseButton onClick={cartAct.resetCart} />
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
                modalAct.openModal({ id: MODAL_TENANT_ID.INPUT_CUSTOMER });
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
