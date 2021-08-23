import {
  Button,
  Flex,
  Heading,
  HStack,
  Slide,
  Spacer,
  Stack,
  Text,
  Tooltip,
  Box,
  useBreakpointValue,
  useToast,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import { formatRp } from "helpers/numberFormatter";
import React, { useState } from "react";
import {
  RiArrowLeftLine,
  RiBankCard2Line,
  RiCloseLine,
  RiDraftLine,
  RiQrCodeLine,
  RiSave3Line,
  RiUser2Line,
  RiUser3Line,
} from "react-icons/ri";
import Customer from "routes/Cashier/subroutes/Checkout/Payment/components/Customer";
import { sampleOrder } from "routes/Cashier/constants/samples";
import ModalCheckout from "routes/Cashier/subroutes/Checkout/Modal/ModalCheckout";
import useCheckoutContext from "routes/Cashier/context/useCheckoutContext";
import useModalContext from "context/useModalContext";
import { MODAL_CASHIER_ID } from "routes/Cashier/constants/modal";
import useThemeContext from "context/useThemeContext";
import { useDate } from "hooks/useDate";
import RadioButtons from "components/RadioButtons";

interface Props {}

const Payment = () => {
  const { modalState, modalAct } = useModalContext();
  const { checkoutState, checkoutAct } = useCheckoutContext();
  const { checkout } = checkoutState;
  const [payNominal, setPayNominal] = useState(0);
  const [payReturn, setPayReturn] = useState(0);

  const { date, time } = useDate();

  const { themeHelpers } = useThemeContext();

  const toast = useToast();

  const donePayment = () => {
    // checkoutAct.checkoutCart();
    modalAct.openModal({ id: MODAL_CASHIER_ID.ALERT_SUCCESS_CHECKOUT });
    checkoutAct.toggleDrawer(false);
  };

  const openModalLoadDraft = () => {
    // modalAct.openModal({ id: MODAL_CASHIER_ID.LOAD_DRAFT });
  };

  const handleChangePayNominal = (value: string) => {
    const normalizedValue =
      payNominal !== 0 ? value.replace(/^0+|\s+/, "") : value.replace("0", "");
    let resPayNominal = parseFloat(normalizedValue);
    if (isNaN(resPayNominal)) {
      resPayNominal = 0;
    }
    setPayNominal(resPayNominal);
    setPayReturn(resPayNominal - checkout.total);
  };

  console.log(payNominal);

  const saveDraft = () => {
    checkoutAct.toggleDrawer(false);
  };

  const content = (
    <Flex
      direction="column"
      height="full"
      overflowY="hidden"
      w={{
        base: "100%",
        xl: "40%",
      }}
      maxW="700px"
      justify="space-between"
      bg="white"
      flexShrink={0}
      borderLeft="1px"
      borderColor="gray.100"
      position={{
        base: "fixed",
        xl: "relative",
      }}
      right="0"
      zIndex="100"
      shadow="xl"
    >
      <HStack px="4" py="2" justify="space-between">
        <Text>{date}</Text>
        <Text fontWeight="semibold" fontSize="xl" color="gray.500">
          {time}
        </Text>
      </HStack>
      <Flex
        direction="column"
        h="1px"
        // minH="70%"
        flexGrow={1}
        borderTop="1px"
        borderColor="gray.100"
      >
        <Customer />
      </Flex>
      <Stack p="4" borderTop="1px" borderColor="gray.100" spacing="4">
        <Stack spacing="1">
          <HStack>
            <Text fontSize="md">Sub Total</Text>
            <Spacer />
            <Text fontSize="md" color="gray.500">
              {formatRp(checkout.subTotal)}
            </Text>
          </HStack>
          <HStack>
            <Text fontSize="md">Diskon</Text>
            <Spacer />
            <Text fontSize="md" color="gray.500">
              {formatRp(checkout.discountTotal)}
            </Text>
          </HStack>
          <HStack>
            <Text fontSize="md">Total</Text>
            <Spacer />
            <Text fontSize="2xl" fontWeight="bold">
              {formatRp(checkout.total)}
            </Text>
          </HStack>
        </Stack>
      </Stack>

      <Stack py="4" borderTop="2px" borderColor="gray.300" spacing="4">
        <Heading size="md" px="4">
          Pembayaran
        </Heading>
        <Tabs isFitted>
          <TabList>
            <Tab>Tunai</Tab>
            <Tab>Debit</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack spacing="4">
                <HStack h="10">
                  <Text flexGrow={1} fontSize="xl" fontWeight="semibold">
                    Jumlah Bayar
                  </Text>
                  <InputGroup w="50%" minW="240px" size="lg">
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={"Rp"}
                    />
                    <Input
                      type="number"
                      placeholder="Jumlah Bayar"
                      textAlign="right"
                      fontWeight="bold"
                      value={String(payNominal)}
                      onChange={(e) => handleChangePayNominal(e.target.value)}
                    />
                  </InputGroup>
                </HStack>
                <HStack h="10">
                  <Text w="40%" fontSize="xl" fontWeight="semibold">
                    {payReturn > 0 ? "Kembalian" : "Kurang Bayar"}
                  </Text>
                  <Text
                    w="60%"
                    textAlign="right"
                    fontSize="xl"
                    fontWeight="bold"
                    color={payReturn > 0 ? "green.500" : "red.500"}
                  >
                    {formatRp(payReturn)}
                  </Text>
                </HStack>
              </Stack>
            </TabPanel>

            <TabPanel>
              <Stack>
                <HStack h="10">
                  <Text flexGrow={1}>Nomor Kartu</Text>
                  <InputGroup w="50%" minW="240px">
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<RiBankCard2Line />}
                    />
                    <Input type="number" placeholder="Nomor Kartu" />
                  </InputGroup>
                </HStack>
                <HStack h="10">
                  <Text flexGrow={1}>Atas Nama</Text>
                  <InputGroup w="50%" minW="240px">
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<RiUser3Line />}
                    />
                    <Input type="number" placeholder="Nama Pemilik Kartu" />
                  </InputGroup>
                </HStack>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>

      <HStack p="4" borderTop="1px" borderColor="gray.100" spacing="4">
        {themeHelpers.xlScreen && (
          <Tooltip label="Kembali ke Daftar Pesanan">
            <Button size="lg" onClick={() => checkoutAct.toggleDrawer(false)}>
              <RiArrowLeftLine size={28} />
            </Button>
          </Tooltip>
        )}
        <Button colorScheme="red" size="lg" flexGrow={1} onClick={donePayment}>
          Bayar
        </Button>
      </HStack>
    </Flex>
  );

  if (themeHelpers.xlScreen) {
    return (
      <>
        <Slide
          direction="right"
          in={checkoutState.isDrawerOpen}
          style={{ zIndex: 100, background: "rgba(0,0,0,0.3)" }}
        >
          {content}
        </Slide>
      </>
    );
  }

  return content;
};

export default Payment;
