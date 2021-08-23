import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
  HStack,
  Spacer,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Tag,
  Center,
} from "@chakra-ui/react";
import Pic from "components/Pic";
import CircleIcon from "components/CircleIcon";
import useThemeContext from "context/useThemeContext";
import { formatRp } from "helpers/numberFormatter";
import React from "react";
import useProductContext from "routes/Cashier/context/useProductContext";
import {
  sampleCartItems,
  sampleProducts,
} from "routes/Tenant/constants/samples";
import Header from "routes/Cashier/subroutes/Checkout/Order/components/Header";
import useCheckoutContext from "routes/Cashier/context/useCheckoutContext";
import { RiAddLine } from "react-icons/ri";
import { MODAL_CASHIER_ID } from "routes/Cashier/constants/modal";
import useModalContext from "context/useModalContext";

const Order = () => {
  const { modalState, modalAct } = useModalContext();
  const { checkoutState } = useCheckoutContext();
  const { checkout } = checkoutState;
  const { themeHelpers } = useThemeContext();
  const avatarSize = themeHelpers.mdValue("sm", "md");

  return (
    <Flex flexGrow={1} overflowX="hidden" h="full" w="1px" direction="column">
      <Header />
      <Box flexGrow={1} overflowY="scroll" h="1px">
        <HStack mt="4" px={{ base: "4", md: "8" }} py="4">
          <Text fontSize="lg" fontWeight="semibold">
            Daftar Pesanan
          </Text>
          {checkout.orders.length > 0 && (
            <Tag color="white" bg="red.500" fontWeight="bold">
              {checkout.orders.length}
            </Tag>
          )}
        </HStack>

        <Accordion allowToggle allowMultiple px={{ base: "2", md: "8" }}>
          <Stack spacing="4">
            {checkout.orders.length > 0 ? (
              checkout.orders.map((orderItem, index) => (
                <AccordionItem bg="white" rounded="md" key={index}>
                  <AccordionButton>
                    <HStack
                      py="2"
                      w="full"
                      fontSize={{ base: "md", md: "lg" }}
                      spacing="3"
                    >
                      <Avatar
                        name={orderItem.customer?.code}
                        size={avatarSize}
                      />
                      <Box textAlign="left">
                        <Text>{orderItem.customer?.name}</Text>
                        {/* <Text fontSize="small" color="gray.500">
                          #1881239
                        </Text> */}
                      </Box>
                      <Spacer />
                      <Box textAlign="right">
                        <Text fontWeight="semibold">
                          {formatRp(orderItem.total)}
                        </Text>
                        <Text fontSize="small">
                          {orderItem.items.length} item
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </HStack>
                  </AccordionButton>
                  <AccordionPanel pb={4} borderTop="1px" borderColor="gray.200">
                    <Box>
                      <Text fontWeight="semibold">
                        [Nama tenant di sini] ({orderItem.cashierId})
                      </Text>
                      <Stack px="4" py="2">
                        {orderItem.items.map((productItem) => (
                          <HStack key={productItem.product.id}>
                            <Text fontSize="sm">{productItem.qty}x</Text>
                            <Text fontSize="sm">
                              {productItem.product.nama}
                            </Text>
                            <Spacer />
                            <Text
                              fontSize="sm"
                              textDecor="line-through"
                              color="gray.400"
                            >
                              {formatRp(
                                productItem.product.hargaAsli * productItem.qty
                              )}
                            </Text>
                            <Text fontSize="sm">
                              {formatRp(
                                productItem.product.harga * productItem.qty
                              )}
                            </Text>
                          </HStack>
                        ))}
                      </Stack>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              ))
            ) : (
              <Center py="16">
                <Text fontSize="3xl" color="gray.400">
                  Belum ada pesanan ditambahkan
                </Text>
              </Center>
            )}

            <HStack
              px="4"
              py="4"
              fontSize="2xl"
              textAlign="center"
              rounded="lg"
              borderColor="gray.500"
              borderWidth="2px"
              borderStyle="dashed"
              opacity="0.5"
              cursor="pointer"
              userSelect="none"
              _hover={{
                opacity: "0.8",
              }}
              justify="center"
              onClick={() =>
                modalAct.openModal({ id: MODAL_CASHIER_ID.INPUT_CUSTOMER })
              }
            >
              <RiAddLine size={30} />
              <Text>Tambah Order</Text>
            </HStack>
          </Stack>
        </Accordion>

        <Box h={themeHelpers.smScreen ? "160px" : "120px"} />
      </Box>
    </Flex>
  );
};

export default Order;
