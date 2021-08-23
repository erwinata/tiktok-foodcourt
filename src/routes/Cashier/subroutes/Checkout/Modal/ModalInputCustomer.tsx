import {
  Box,
  Button,
  chakra,
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
  Stack,
  Tag,
} from "@chakra-ui/react";
import QRcodeReader from "components/BarcodeReader/QRcodeReader";
import Form from "components/Form";
import useModalContext from "context/useModalContext";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { RiAddLine, RiArrowLeftLine } from "react-icons/ri";
import useCheckoutContext from "routes/Cashier/context/useCheckoutContext";

// export const MotionBox = motion<BoxProps>(Box);
const MotionBox = chakra(motion.div);

interface Props {}

const ModalInputCustomer: React.FC<Props> = () => {
  const { modalState, modalAct } = useModalContext();
  const { checkoutState, checkoutAct } = useCheckoutContext();
  const [inputCardNumber, setInputCardNumber] = useState("");
  const [successCardList, setSuccessCardList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const onClose = () => {
    if (!isCameraReady) return;
    modalAct.closeModal();
  };

  const submitCustomer = async (cardNumber: string) => {
    setIsLoading(true);
    const isSuccess = await checkoutAct.submitCustomerCardId(cardNumber);
    if (isSuccess) {
      setSuccessCardList([...successCardList, cardNumber]);
    }
    setInputCardNumber("");
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
              <HStack w="full">
                <Input
                  type="tel"
                  placeholder="Atau Input Nomor Kartu"
                  textAlign="center"
                  value={inputCardNumber}
                  onChange={(e) => setInputCardNumber(e.target.value)}
                  readOnly={isLoading}
                />
                <IconButton
                  aria-label="Tambah"
                  type="submit"
                  colorScheme="red"
                  icon={<RiAddLine />}
                  isLoading={isLoading}
                />
              </HStack>
              <HStack wrap="wrap">
                {successCardList.map((item) => (
                  <Tag>#{item}</Tag>
                ))}
              </HStack>
            </Stack>
          </ModalBody>
          <ModalFooter borderColor="gray.200" borderTopWidth="1px">
            <HStack align="center" w="full">
              <Button
                disabled={isLoading}
                colorScheme="red"
                onClick={onClose}
                size="lg"
                flexGrow={1}
              >
                Tutup
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
};

export default ModalInputCustomer;
