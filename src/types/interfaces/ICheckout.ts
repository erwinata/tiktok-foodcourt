import { ICustomer } from "types/interfaces/ICustomer";
import { IOrder } from "types/interfaces/IOrder";
import { IOrderItem } from "types/interfaces/IOrderItem";
import { IUser } from "types/interfaces/IUser";

export interface ICheckout {
  id: string;
  createdAt?: Date;
  paidAt?: Date;
  discountTotal: number;
  total: number;
  subTotal: number;
  orders: IOrder[];
  cashier?: IUser;
}
