import { Flex } from "@chakra-ui/react";
import useSimpleEffect from "hooks/useSimpleEffect";
import React from "react";
import useCartContext from "routes/Tenant/context/useCartContext";
import useProductContext from "routes/Tenant/context/useProductContext";
import Cart from "routes/Tenant/subroutes/Order/Cart/Cart";
import Floater from "routes/Tenant/subroutes/Order/Floater/Floater";
import Menu from "routes/Tenant/subroutes/Order/Menu/Menu";
import Modal from "routes/Tenant/subroutes/Order/Modal/Modal";

const Order = () => {
  const { productAct } = useProductContext();
  const { cartState } = useCartContext();

  useSimpleEffect(() => {
    // productAct.resetProducts();
  }, []);

  return (
    <Flex justify="space-between" h="100vh" w="100%">
      <Menu />
      <Cart />

      <Modal />
      <Floater />
    </Flex>
  );
};

export default Order;
