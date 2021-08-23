import { IProduct } from "types/interfaces/IProduct";

export interface IOrderItem {
  product: IProduct;
  qty: number;
  discount: number;
}
