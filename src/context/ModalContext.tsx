import React, { FC, useReducer } from "react";
import {
  sampleCategories,
  sampleProducts,
} from "routes/Tenant/constants/samples";
import { ICategory } from "types/interfaces/ICategory";
import { IModal } from "types/interfaces/IModal";
import { IProduct } from "types/interfaces/IProduct";

type IState = {
  modal?: IModal;
};

const initialState: IState = {};

export const ModalContext = React.createContext<{
  state: IState;
  dispatch: React.Dispatch<Partial<IState>>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IState, changes: Partial<IState>): IState => {
  return { ...state, ...changes };
};

export const ModalProvider: FC<any> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ModalContext.Provider>
  );
};
