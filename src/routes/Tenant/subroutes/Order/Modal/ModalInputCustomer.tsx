import {
  Box,
  Button,
  chakra,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import BarcodeReader from "components/BarcodeReader/BarcodeReader";
import QRcodeReader from "components/BarcodeReader/QRcodeReader";
import Form from "components/Form";
import useModalContext from "context/useModalContext";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import useCartContext from "routes/Tenant/context/useCartContext";
import useTenantContext from "routes/Tenant/context/useTenantContext";

interface Props {}

const ModalInputCustomer: React.FC<Props> = () => {
  const { tenantState } = useTenantContext();
  const { modalState, modalAct } = useModalContext();
  const { cartState, cartAct } = useCartContext();
  const [inputCardNumber, setInputCardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const onClose = () => {
    if (!isCameraReady) return;
    modalAct.closeModal();
  };

  const submitCustomer = async (cardNumber: string) => {
    setIsLoading(true);
    const isSuccess = await cartAct.submitCustomerCardId(
      cardNumber,
      tenantState.customerCardIDs
    );
    if (isSuccess) {
      onClose();
      return;
    }
    setIsLoading(false);
  };

  const handleCodeDetected = (code: string) => {
    submitCustomer(code);
  };

  return (
    <Modal onClose={onClose} isOpen isCentered>
      <Form onSubmit={() => submitCustomer(inputCardNumber)}>
        <ModalOverlay />
        <ModalContent mx="4">
          <ModalHeader>Input Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody py="4">
            <Stack align="center" textAlign="center" spacing="4">
              <Heading fontSize="lg" fontWeight="normal">
                Scan Kartu Customer
              </Heading>
              <QRcodeReader
                isScanning={!isLoading}
                onDetected={handleCodeDetected}
                onReady={() => setIsCameraReady(true)}
              />
              <Input
                type="tel"
                placeholder="Atau Input Nomor Kartu"
                textAlign="center"
                value={inputCardNumber}
                onChange={(e) => setInputCardNumber(e.target.value)}
                readOnly={isLoading}
              />
            </Stack>
          </ModalBody>
          <ModalFooter borderColor="gray.200" borderTopWidth="1px">
            <HStack align="center" w="full">
              <IconButton
                aria-label="Batal"
                icon={<RiArrowLeftLine size={24} />}
                onClick={onClose}
                size="lg"
              />
              <Button
                isLoading={isLoading}
                colorScheme="red"
                type="submit"
                size="lg"
                flexGrow={1}
              >
                OK
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
};

export default ModalInputCustomer;
