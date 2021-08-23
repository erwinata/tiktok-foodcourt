import { ICustomer } from "types/interfaces/ICustomer";
import { IOrder } from "types/interfaces/IOrder";
import { IOrderItem } from "types/interfaces/IOrderItem";
import { IProduct } from "types/interfaces/IProduct";

export const convertProductToBE = (product: IProduct) => {};

export const convertCustomerToFE = (customer: any): ICustomer => {
  return {
    code: customer,
    name: "#" + customer,
  };
};

export const convertProductToFE = (product: any): IProduct => {
  return {
    id: product.id,
    photo: product.photo ?? "",
    nama: product.nama,
    stok: product.stok,
    harga: product.harga_diskon || product.harga,
    hargaAsli: product.harga,
    deskripsi: product.deskripsi,
    kategoriId: product.kategori_id,
    status: product.status,
  };
};

export const convertOrderItemToFE = (orderItem: any): IOrderItem => {
  return {
    qty: orderItem.qty,
    product: convertProductToFE(orderItem),
    discount: 0,
  };
};

export const convertOrderToFE = (order: any): IOrder => {
  return {
    number: order.order_number,
    status: order.status,
    total: order.total,
    discountTotal: order.discount,
    subTotal: order.total + order.discount,
    items: order.menu.map((item: any) => convertOrderItemToFE(item)),
    cashierId: order.cashier_id,
    createdAt: order.created_at,
    customer: convertCustomerToFE(order.card_number),
  };
};
