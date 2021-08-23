import { useToast } from "@chakra-ui/react";
import { API_GET_ALL_ORDER_BY_CARD } from "constants/api";
import { apiGet } from "helpers/api";
import { convertOrderToFE } from "helpers/convertToFE";
import { useCallback, useContext } from "react";
import { placeholderCheckout } from "routes/Cashier/constants/placeholder";
import { CheckoutContext } from "routes/Cashier/context/CheckoutContext";
import { IOrder } from "types/interfaces/IOrder";
import { IOrderItem } from "types/interfaces/IOrderItem";

const useCheckoutContext = () => {
  const { state, dispatch } = useContext(CheckoutContext);
  const toast = useToast();

  const updateState = useCallback(
    (newPartialState: Partial<typeof state>) => {
      dispatch(newPartialState);
    },
    [dispatch]
  );

  const resetCheckout = useCallback(() => {
    dispatch({
      isDrawerOpen: false,
      checkout: placeholderCheckout,
    });
  }, [dispatch]);

  const calculateTotals = useCallback((orders: IOrder[]) => {
    let total = 0;
    let subTotal = 0;
    let discountTotal = 0;

    orders.forEach((order) => {
      subTotal += order.subTotal;
      discountTotal += order.discountTotal;
    });

    total = subTotal - discountTotal;

    return { total, subTotal, discountTotal };
  }, []);

  const toggleDrawer = useCallback(
    async (isOpen?: boolean) => {
      dispatch({
        isDrawerOpen: isOpen !== undefined ? isOpen : !state.isDrawerOpen,
      });
    },
    [dispatch, state.isDrawerOpen]
  );

  const addOrder = useCallback(
    async (order: IOrder) => {
      const resultOrderList = [...state.checkout.orders, order];
      const { total, subTotal, discountTotal } =
        calculateTotals(resultOrderList);

      dispatch({
        checkout: {
          ...state.checkout,
          total,
          subTotal,
          discountTotal,
          orders: resultOrderList,
        },
      });
    },
    [calculateTotals, dispatch, state.checkout]
  );

  const removeOrder = useCallback(
    async (customerCode: string) => {
      const resultOrderList = state.checkout.orders.filter(
        (item) => item.customer?.code !== customerCode
      );
      const { total, subTotal, discountTotal } =
        calculateTotals(resultOrderList);

      dispatch({
        checkout: {
          ...state.checkout,
          orders: resultOrderList,
          total,
          subTotal,
          discountTotal,
        },
      });
    },
    [calculateTotals, dispatch, state.checkout]
  );

  const submitCustomerCardId = useCallback(
    async (inputCardNumber: string) => {
      if (
        state.checkout.orders.find(
          (item) => item.customer?.code === inputCardNumber
        )
      ) {
        toast({
          title: `No kartu #${inputCardNumber} sudah ditambahkan sebelumnya`,
          status: "info",
          duration: 2000,
          position: "top",
        });
        return false;
      }

      if (!state.customerCardIDs.includes(inputCardNumber)) {
        toast({
          title: `No kartu #${inputCardNumber} tidak valid`,
          status: "error",
          duration: 2000,
          position: "top",
        });
        return false;
      }

      const resApi = await apiGet(API_GET_ALL_ORDER_BY_CARD, {
        cardNumber: inputCardNumber,
      });

      if (resApi.ok && resApi.data) {
        if (resApi.data.data.length > 0) {
          toast({
            title: `#${inputCardNumber} ditambahkan`,
            duration: 2000,
            position: "top",
          });
          addOrder(convertOrderToFE(resApi.data.data[0]));
          return true;
        } else {
          toast({
            title: `Tidak ada order pada kartu #${inputCardNumber}`,
            status: "info",
            duration: 2000,
            position: "top",
          });
          return false;
        }
      } else {
        return false;
      }
    },
    [addOrder, state.checkout.orders, state.customerCardIDs, toast]
  );

  return {
    checkoutState: state,
    checkoutAct: {
      updateState,
      toggleDrawer,
      submitCustomerCardId,
      addOrder,
      removeOrder,
      resetCheckout,
    },
  };
};

export default useCheckoutContext;
