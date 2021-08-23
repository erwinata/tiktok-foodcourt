import { ICheckout } from "types/interfaces/ICheckout";
import { IOrder } from "types/interfaces/IOrder";

export const placeholderOrder: IOrder = {
  number: "",
  status: 0,
  discountTotal: 0,
  total: 0,
  subTotal: 0,
  items: [],
};

export const placeholderCheckout: ICheckout = {
  id: "",
  discountTotal: 0,
  total: 0,
  subTotal: 0,
  orders: [],
};
