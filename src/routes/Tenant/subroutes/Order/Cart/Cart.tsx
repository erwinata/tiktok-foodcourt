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
  useToast,
} from "@chakra-ui/react";
import { API_POST_NEW_ORDER, API_POST_UPDATE_ORDER } from "constants/api";
import useModalContext from "context/useModalContext";
import useThemeContext from "context/useThemeContext";
import useUserContext from "context/useUserContext";
import { apiPost } from "helpers/api";
import { convertOrderToBE } from "helpers/convertToBE";
import { formatRp } from "helpers/numberFormatter";
import { getUniqid } from "helpers/uniqid";
import { useDate } from "hooks/useDate";
import React, { useState } from "react";
import { RiArrowLeftLine, RiDraftLine } from "react-icons/ri";
import { MODAL_TENANT_ID } from "routes/Tenant/constants/modal";
import useCartContext from "routes/Tenant/context/useCartContext";
import CartItemContainer from "routes/Tenant/subroutes/Order/Cart/components/CartItemContainer";
import Customer from "routes/Tenant/subroutes/Order/Cart/components/Customer";
import { IOrder } from "types/interfaces/IOrder";

interface Props {}

const Cart = () => {
  const { modalState, modalAct } = useModalContext();
  const { cartState, cartAct } = useCartContext();
  const { userState: authState } = useUserContext();
  const { order } = cartState;
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);

  const { date, time } = useDate();

  const { themeHelpers } = useThemeContext();

  const toast = useToast();

  const checkout = async () => {
    setIsLoadingCheckout(true);

    const isNewOrder = order.number === "";

    const updatedOrder: IOrder = {
      ...order,
      number: order.number !== "" ? order.number : getUniqid(),
      cashierId: authState.user?.id || 0,
    };

    const params = {
      ...convertOrderToBE(updatedOrder),
      orderId: updatedOrder.number,
    };

    const res = await apiPost(
      isNewOrder ? API_POST_NEW_ORDER : API_POST_UPDATE_ORDER,
      params
    );

    if (res.ok) {
      cartAct.resetCart();
      cartAct.toggleDrawer(false);
      modalAct.openModal({ id: MODAL_TENANT_ID.ALERT_SUCCESS_CHECKOUT });
    }

    setIsLoadingCheckout(false);
  };

  const openModalLoadDraft = () => {
    modalAct.openModal({ id: MODAL_TENANT_ID.LOAD_DRAFT });
  };

  const saveDraft = () => {
    cartAct.toggleDrawer(false);
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
      maxW="500px"
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
        minH="70%"
        flexGrow={1}
        borderTop="1px"
        borderColor="gray.100"
      >
        <Customer />
        <CartItemContainer />
      </Flex>
      <Stack p="4" borderTop="1px" borderColor="gray.100" spacing="4">
        <Stack spacing="1">
          <HStack>
            <Text fontSize="sm">Sub Total</Text>
            <Spacer />
            <Text fontSize="sm" color="gray.500">
              {formatRp(order.subTotal)}
            </Text>
          </HStack>
          <HStack>
            <Text fontSize="sm">Diskon</Text>
            <Spacer />
            <Text fontSize="sm" color="green.500">
              -{formatRp(order.discountTotal)}
            </Text>
          </HStack>
          <HStack>
            <Heading size="md">Total</Heading>
            <Spacer />
            <Text fontSize="2xl" fontWeight="bold">
              {formatRp(order.total)}
            </Text>
          </HStack>
        </Stack>
        <HStack>
          {themeHelpers.xlScreen && (
            <Tooltip label="Kembali ke Menu">
              <Button size="lg" onClick={() => cartAct.toggleDrawer(false)}>
                <RiArrowLeftLine size={28} />
              </Button>
            </Tooltip>
          )}
          <Tooltip label="Buka Draft Pesanan">
            <Button size="lg" onClick={openModalLoadDraft}>
              <RiDraftLine size={28} />
            </Button>
          </Tooltip>
          {/* <Tooltip label="Simpan ke Draft">
            <Button size="lg" onClick={saveDraft}>
              <RiSave3Line size={28} />
            </Button>
          </Tooltip> */}
          <Button
            colorScheme="red"
            size="lg"
            flexGrow={1}
            onClick={checkout}
            disabled={order.customer === undefined || order.items.length === 0}
            isLoading={isLoadingCheckout}
          >
            Selesai
          </Button>
        </HStack>
      </Stack>
    </Flex>
  );

  if (themeHelpers.xlScreen) {
    return (
      <>
        <Slide
          direction="right"
          in={cartState.isDrawerOpen}
          style={{ zIndex: 100, background: "rgba(0,0,0,0.3)" }}
        >
          {content}
        </Slide>
      </>
    );
  }

  return content;
};

export default Cart;
