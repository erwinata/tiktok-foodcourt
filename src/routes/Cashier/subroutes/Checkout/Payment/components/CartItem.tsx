import { HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import Pic from "components/Pic";
import { formatRp } from "helpers/numberFormatter";
import React from "react";
import { IOrderItem } from "types/interfaces/IOrderItem";

interface Props {
  cartItem: IOrderItem;
}

const CartItem = ({ cartItem }: Props) => {
  return (
    <HStack py="1" spacing="2">
      <Pic
        minifyText
        w="20%"
        maxW="70px"
        borderRadius="md"
        objectFit="cover"
        src={cartItem.product.photo}
        alt={cartItem.product.nama}
      />
      <Stack w="full" spacing="1">
        <Text size="sm" fontWeight="bold">
          {cartItem.product.nama}
        </Text>
      </Stack>
      <Spacer />
      <Stack align="flex-end" spacing="0">
        <Text fontWeight="bold" color="gray.500">
          {formatRp(cartItem.product.harga * cartItem.qty)}
        </Text>
      </Stack>
    </HStack>
  );
};

export default CartItem;
