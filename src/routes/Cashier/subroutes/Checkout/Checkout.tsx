import { Flex } from "@chakra-ui/react";
import useSimpleEffect from "hooks/useSimpleEffect";
import React from "react";
import useCheckoutContext from "routes/Cashier/context/useCheckoutContext";
import useProductContext from "routes/Cashier/context/useProductContext";
import Floater from "routes/Cashier/subroutes/Checkout/Floater/Floater";
import Modal from "routes/Cashier/subroutes/Checkout/Modal/Modal";
import Order from "routes/Cashier/subroutes/Checkout/Order/Order";
import Payment from "routes/Cashier/subroutes/Checkout/Payment/Payment";

const Checkout = () => {
  return (
    <Flex justify="space-between" h="100vh" w="100%">
      <Order />
      <Payment />

      <Modal />
      <Floater />
    </Flex>
  );
};

export default Checkout;
