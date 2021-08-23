import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import CircleIcon from "components/CircleIcon";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import useCheckoutContext from "routes/Cashier/context/useCheckoutContext";

interface Props {}

const FloaterCheckout = () => {
  const { checkoutState, checkoutAct } = useCheckoutContext();
  const { checkout } = checkoutState;

  const resetCheckout = () => {
    checkoutAct.updateState({ checkout: undefined });
  };

  return (
    <Box
      onClick={() => checkoutAct.toggleDrawer()}
      shadow="xl"
      rounded="lg"
      pos="fixed"
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
      maxW="400px"
      bg="red.500"
      color="white"
      userSelect="none"
      cursor="pointer"
    >
      <HStack w="full">
        <Stack spacing="-3.5" direction="row-reverse">
          {checkout.orders.reverse().map((item) => (
            <Avatar
              name={item.customer?.code}
              key={item.customer?.code}
              size="sm"
            />
          ))}
        </Stack>
        <Stack spacing="0">
          <Text fontSize="sm" fontWeight="bold">
            Checkout
          </Text>
          <Text fontSize="md" fontWeight="normal">
            {checkout.orders.length} Customer
          </Text>
        </Stack>
        <Spacer />
        <Stack spacing="0" align="flex-end" pr="2">
          <Text as="span" fontSize="lg">
            (Rp{checkout.total})
          </Text>
        </Stack>
        <Center
          bg="rgba(0,0,0,0.125)"
          px="2"
          py="2"
          rounded="lg"
          onClick={(e) => {
            e.stopPropagation();
            resetCheckout();
          }}
        >
          <RiCloseLine size={24} />
        </Center>
      </HStack>
    </Box>
  );
};

export default FloaterCheckout;
