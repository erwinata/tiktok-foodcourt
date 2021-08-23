import React, { FC, useReducer } from "react";
import { placeholderOrder } from "routes/Tenant/constants/placeholder";
import {
  sampleCategories,
  sampleProducts,
} from "routes/Tenant/constants/samples";
import { ICategory } from "types/interfaces/ICategory";
import { IOrder } from "types/interfaces/IOrder";
import { IProduct } from "types/interfaces/IProduct";

type IState = {
  order: IOrder;
  isDrawerOpen: boolean;
};

const initialState: IState = {
  order: placeholderOrder,
  isDrawerOpen: false,
};

export const CartContext = React.createContext<{
  state: IState;
  dispatch: React.Dispatch<Partial<IState>>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IState, changes: Partial<IState>): IState => {
  console.log(changes);
  return { ...state, ...changes };
};

export const CartProvider: FC<any> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};
