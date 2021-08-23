import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  Select,
  Spacer,
  Stack,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import CircleIcon from "components/CircleIcon";
import Pagination from "components/Pagination";
import { formatRp } from "helpers/numberFormatter";
import React from "react";
import {
  RiCalendar2Fill,
  RiPrinterFill,
  RiSearchLine,
  RiUser3Fill,
} from "react-icons/ri";
import { sampleOrder } from "routes/Tenant/constants/samples";
import { IOrder } from "types/interfaces/IOrder";

const historyItems: IOrder[] = [
  { ...sampleOrder, status: 1 },
  sampleOrder,
  sampleOrder,
];

interface Props {
  orderList: IOrder[];
}

const HistoryItems: React.FC<Props> = ({ orderList }) => {
  return (
    <Accordion allowToggle allowMultiple mt="2">
      <Stack divider={<Divider />} spacing="0">
        {orderList.map((order) => (
          <AccordionItem borderWidth={0} key={order.number}>
            <AccordionButton
              _focus={{ outline: "none" }}
              _hover={{ bg: "gray.100" }}
            >
              <HStack flex="1" textAlign="left" py="1">
                <Box>
                  <HStack>
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      fontWeight="semibold"
                    >
                      {/* {dayjs(order.createdAt).format("D MMMM YYYY")} */}
                      {order.number}
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      color="gray.500"
                    ></Text>
                  </HStack>
                  <HStack mt="1">
                    <CircleIcon
                      size="24px"
                      color="white"
                      icon={<RiUser3Fill />}
                    />
                    <Text fontSize={{ base: "sm", md: "md" }}>
                      {order?.customer?.code}
                    </Text>
                    {/* <CircleIcon
                    size="24px"
                    color="white"
                    icon={<RiCalendar2Fill />}
                  /> */}
                  </HStack>
                </Box>
                <Spacer />
                <Stack align="flex-end" spacing="1" pr="2">
                  <Text fontSize="sm" color="gray.500">
                    12 Maret 2021 (03:11)
                  </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="bold"
                    color="gray.600"
                  >
                    Rp.110.000
                  </Text>
                </Stack>
              </HStack>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              pt={0}
              pb={8}
              px="0"
              borderTop="1px"
              borderColor="gray.100"
            >
              <Stack
                direction={{ base: "column", md: "row" }}
                px="4"
                py="2"
                bg="gray.50"
                spacing="1"
              >
                <Stack spacing="0.5" align="flex-start">
                  {/* <HStack pt="1">
                  <Text fontSize="sm" w="70px">
                    Kasir
                  </Text>
                  <Avatar name={order?.cashierId?.name} size="xs" />
                  <Text fontSize="sm" fontWeight="semibold">
                    {order?.cashierId?.name}
                  </Text>
                </HStack> */}

                  <HStack pt="1">
                    <Text fontSize="sm" w="70px">
                      Pesanan
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold">
                      {order.items.length} Item
                    </Text>
                  </HStack>
                </Stack>
                <Spacer />
                <Stack
                  align={{ base: "flex-start", md: "flex-end" }}
                  spacing="0.5"
                >
                  <HStack>
                    <Text fontSize="sm" w={{ base: "70px", md: "auto" }}>
                      Subtotal
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      w={{ base: "auto", md: "100px" }}
                      textAlign="right"
                    >
                      Rp.100.000
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="sm" w={{ base: "70px", md: "auto" }}>
                      Diskon
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      w={{ base: "auto", md: "100px" }}
                      textAlign="right"
                    >
                      Rp.10.000
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="sm" w={{ base: "70px", md: "auto" }}>
                      Total
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      w={{ base: "auto", md: "100px" }}
                      textAlign="right"
                    >
                      Rp.110.000
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
              <Stack px="4" py="2">
                {order.items.map((item) => (
                  <HStack key={item.product.id}>
                    <Text fontSize="sm">{item.qty}x</Text>
                    <Text fontSize="sm">{item.product.nama}</Text>
                    <Spacer />
                    <Text fontSize="sm">
                      {formatRp(item.product.harga * item.qty)}
                    </Text>
                  </HStack>
                ))}
              </Stack>
              <HStack justify="flex-end" px="4" py="2">
                <Button size="sm" leftIcon={<RiPrinterFill />}>
                  Cetak Order
                </Button>
              </HStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Stack>
    </Accordion>
  );
};

export default HistoryItems;
