import { ICustomer } from "types/interfaces/ICustomer";
import { IOrderItem } from "types/interfaces/IOrderItem";
import { IUser } from "types/interfaces/IUser";

export interface IOrder {
  number: string;
  createdAt?: Date;
  paidAt?: Date;
  status: number;
  customer?: ICustomer;
  discountTotal: number;
  total: number;
  subTotal: number;
  items: IOrderItem[];
  cashierId?: number;
}
