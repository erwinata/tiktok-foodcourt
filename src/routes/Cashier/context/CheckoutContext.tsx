import React, { FC, useReducer } from "react";
import { placeholderCheckout } from "routes/Cashier/constants/placeholder";
import { ICheckout } from "types/interfaces/ICheckout";

type IState = {
  checkout: ICheckout;
  isDrawerOpen: boolean;
  customerCardIDs: string[];
};

const initialState: IState = {
  checkout: placeholderCheckout,
  isDrawerOpen: false,
  customerCardIDs: [],
};

export const CheckoutContext = React.createContext<{
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

export const CheckoutProvider: FC<any> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CheckoutContext.Provider>
  );
};
