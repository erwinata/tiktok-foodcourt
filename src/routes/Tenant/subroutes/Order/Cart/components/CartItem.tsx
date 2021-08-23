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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import Pic from "components/Pic";
import { formatRp } from "helpers/numberFormatter";
import React from "react";
import {
  RiAddFill,
  RiNotification3Fill,
  RiSearchLine,
  RiLayoutGridFill,
  RiLayoutLine,
  RiStarLine,
  RiStarFill,
  RiCloseLine,
} from "react-icons/ri";
import useCartContext from "routes/Tenant/context/useCartContext";
import { IOrderItem } from "types/interfaces/IOrderItem";
import { IProduct } from "types/interfaces/IProduct";

interface Props {
  cartItem: IOrderItem;
}

const CartItem = ({ cartItem }: Props) => {
  const { cartAct } = useCartContext();

  return (
    <HStack py="1" spacing="2">
      <Pic
        minifyText
        w="20%"
        maxW="60px"
        flexShrink={0}
        borderRadius="md"
        objectFit="cover"
        src={cartItem.product.photo}
        alt={cartItem.product.nama}
        mt={-2}
      />
      <Stack w="full" spacing="1">
        <Text size="sm" fontWeight="bold">
          {cartItem.product.nama}
        </Text>
        <HStack w="full">
          <HStack w="120px">
            <Button
              size="sm"
              onClick={() => {
                cartAct.setQtyProductInCart(cartItem.product, cartItem.qty - 1);
              }}
            >
              -
            </Button>
            <Input
              variant="unstyled"
              textAlign="center"
              value={cartItem.qty}
              onChange={() => {}}
            />
            <Button
              size="sm"
              onClick={() => {
                cartAct.setQtyProductInCart(cartItem.product, cartItem.qty + 1);
              }}
            >
              +
            </Button>
          </HStack>
        </HStack>
      </Stack>
      <Spacer />
      <Stack align="flex-end" spacing="1">
        <Box
          opacity="0.2"
          _hover={{ opacity: "0.5" }}
          onClick={() => {
            cartAct.setQtyProductInCart(cartItem.product, 0);
          }}
        >
          <RiCloseLine size={18} />
        </Box>
        <HStack>
          <Text color="gray.500" textDecor="line-through" fontSize="sm">
            {formatRp(cartItem.product.hargaAsli * cartItem.qty)}
          </Text>
          <Text fontWeight="bold">
            {formatRp(cartItem.product.harga * cartItem.qty)}
          </Text>
        </HStack>
      </Stack>
    </HStack>
  );
};

export default CartItem;
