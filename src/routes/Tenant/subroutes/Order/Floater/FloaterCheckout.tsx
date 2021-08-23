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
  Circle,
} from "@chakra-ui/react";
import React from "react";
import {
  RiAddFill,
  RiNotification3Fill,
  RiSearchLine,
  RiLayoutGridFill,
  RiLayoutLine,
  RiArrowRightFill,
  RiArrowRightLine,
  RiUser2Line,
  RiUser3Line,
  RiUserFill,
  RiUser3Fill,
  RiCloseLine,
} from "react-icons/ri";
import CircleIcon from "components/CircleIcon";
import useCartContext from "routes/Tenant/context/useCartContext";

interface Props {}

const FloaterCheckout = () => {
  const { cartState, cartAct } = useCartContext();

  return (
    <Box
      onClick={() => cartAct.toggleDrawer()}
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
        <CircleIcon icon={<RiUser3Fill />} />
        <Stack spacing="0">
          <Text as="span" fontWeight="bold" fontSize="lg">
            {cartState.order.customer?.name}
          </Text>
          <Text fontSize="sm">{cartState.order.items.length} item</Text>
        </Stack>
        <Spacer />
        <Stack spacing="0" align="flex-end" pr="2">
          <Text fontSize="sm">Checkout</Text>
          <Text fontSize="md" fontWeight="normal">
            (Rp{cartState.order.total})
          </Text>
        </Stack>
        <Center
          bg="rgba(0,0,0,0.125)"
          px="2"
          py="2"
          rounded="lg"
          onClick={(e) => {
            e.stopPropagation();
            cartAct.resetCart();
          }}
        >
          <RiCloseLine size={24} />
        </Center>
      </HStack>
    </Box>
  );
};

export default FloaterCheckout;
