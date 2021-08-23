import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Tag,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CartItem from "routes/Tenant/subroutes/Order/Cart/components/CartItem";
import { sampleCartItems } from "routes/Tenant/constants/samples";
import { IOrderItem } from "types/interfaces/IOrderItem";
import useCartContext from "routes/Tenant/context/useCartContext";

interface Props {}

const CartItemContainer: React.FC<Props> = () => {
  const { cartState, cartAct } = useCartContext();
  const [isConfirmReset, setIsConfirmReset] = useState(false);
  const { order } = cartState;

  const resetItems = () => {
    cartAct.updateState({
      order: { ...cartState.order, items: [] },
    });
    setIsConfirmReset(false);
  };

  return (
    <Flex
      direction="column"
      h="100%"
      py="2"
      borderTop="1px"
      borderColor="gray.100"
      flexGrow={1}
    >
      <HStack py="2" px="4">
        <Heading size="md">Pesanan</Heading>
        {order.items.length > 0 && (
          <Tag variant="solid" colorScheme="red">
            {order.items.length}
          </Tag>
        )}
        <Spacer />
        {isConfirmReset ? (
          <HStack>
            <Button size="sm" colorScheme="red" onClick={resetItems}>
              Reset
            </Button>
            <Button size="sm" onClick={() => setIsConfirmReset(false)}>
              Batal
            </Button>
          </HStack>
        ) : (
          <Button size="sm" onClick={() => setIsConfirmReset(true)}>
            Reset
          </Button>
        )}
      </HStack>
      <Stack
        py="1"
        px="4"
        spacing="2"
        overflowY="scroll"
        flexGrow={1}
        divider={<Divider />}
      >
        {order.items.map((item, index) => (
          <CartItem cartItem={item} key={item.product.id} />
        ))}
      </Stack>
    </Flex>
  );
};

export default CartItemContainer;
