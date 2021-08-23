import { useToast } from "@chakra-ui/react";
import { API_GET_ALL_ORDER_BY_CARD } from "constants/api";
import { apiGet } from "helpers/api";
import { convertOrderToFE } from "helpers/convertToFE";
import { useCallback, useContext } from "react";
import { placeholderOrder } from "routes/Tenant/constants/placeholder";
import { CartContext } from "routes/Tenant/context/CartContext";
import { ICustomer } from "types/interfaces/ICustomer";
import { IOrderItem } from "types/interfaces/IOrderItem";
import { IProduct } from "types/interfaces/IProduct";

const useCartContext = () => {
  const { state, dispatch } = useContext(CartContext);
  const toast = useToast();

  const updateState = useCallback(
    async (newPartialState: Partial<typeof state>) => {
      dispatch(newPartialState);
    },
    [dispatch]
  );

  const calculateTotals = useCallback((items: IOrderItem[]) => {
    let total = 0;
    let subTotal = 0;
    let discountTotal = 0;

    items.forEach((item) => {
      subTotal += item.product.hargaAsli * item.qty;
      total += item.product.harga * item.qty;
    });

    discountTotal = subTotal - total;
    return { total, subTotal, discountTotal };
  }, []);

  const setQtyProductInCart = useCallback(
    async (productToAdd: IProduct, qty: number) => {
      let resOrderItems = state.order.items;
      const existingItemIndex = resOrderItems.findIndex(
        (item) => item.product.id === productToAdd.id
      );
      if (existingItemIndex !== -1) {
        const updatedItem: IOrderItem = {
          ...resOrderItems[existingItemIndex],
          qty: qty,
        };
        resOrderItems = [
          ...resOrderItems.slice(0, existingItemIndex),
          updatedItem,
          ...resOrderItems.slice(existingItemIndex + 1, resOrderItems.length),
        ];
      } else {
        const addedItem: IOrderItem = {
          product: productToAdd,
          qty: qty,
          discount: 0,
        };
        resOrderItems = [...resOrderItems, addedItem];
      }

      resOrderItems = resOrderItems.filter((item) => item.qty > 0);
      const totals = calculateTotals(resOrderItems);

      dispatch({ order: { ...state.order, items: resOrderItems, ...totals } });
    },
    [dispatch, state.order, calculateTotals]
  );

  const setCustomer = useCallback(
    async (customer?: ICustomer) => {
      dispatch({ order: { ...state.order, customer } });
    },
    [dispatch, state.order]
  );

  const resetCart = useCallback(async () => {
    dispatch({ order: placeholderOrder });
  }, [dispatch]);

  const toggleDrawer = useCallback(
    async (isOpen?: boolean) => {
      dispatch({
        isDrawerOpen: isOpen !== undefined ? isOpen : !state.isDrawerOpen,
      });
    },
    [dispatch, state.isDrawerOpen]
  );

  const submitCustomerCardId = useCallback(
    async (inputCardNumber: string, customerCardIDs: string[]) => {
      if (!customerCardIDs.includes(inputCardNumber)) {
        toast({
          title: `No kartu #${inputCardNumber} tidak valid`,
          status: "error",
          duration: 2000,
          position: "top",
        });
        return false;
      }

      const customer: ICustomer = {
        code: inputCardNumber,
        name: "#" + inputCardNumber,
      };

      const resApi = await apiGet(API_GET_ALL_ORDER_BY_CARD, {
        cardNumber: inputCardNumber,
      });

      if (resApi.ok && resApi.data) {
        if (resApi.data.data.length > 0) {
          updateState({ order: convertOrderToFE(resApi.data.data[0]) });
        } else {
          setCustomer(customer);
        }
        return true;
      } else {
        toast({
          title: "Gagal mendapatkan detail order",
          status: "warning",
          duration: 2000,
          position: "top",
        });
        return false;
      }
    },
    [setCustomer, toast, updateState]
  );

  return {
    cartState: state,
    cartAct: {
      updateState,
      setQtyProductInCart,
      setCustomer,
      resetCart,
      toggleDrawer,
      submitCustomerCardId,
    },
  };
};

export default useCartContext;
