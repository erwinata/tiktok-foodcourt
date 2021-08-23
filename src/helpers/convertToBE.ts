import { IOrder } from "types/interfaces/IOrder";

export const convertOrderToBE = (order: IOrder) => {
  return {
    order_number: order.number,
    status: order.status,
    cashier_id: order.cashierId,
    total: order.total,
    discount: order.discountTotal,
    card_number: order.customer?.code,
    menu: order.items.map((item) => ({
      menu_id: item.product.id,
      qty: item.qty,
    })),
    //PENDING
    payment_method: 1,
    users_id: order.cashierId,
  };
};
