import React, { FC, ReactNode, RefObject, useReducer } from "react";
import {
  sampleCategories,
  sampleProducts,
} from "routes/Tenant/constants/samples";
import { ICategory } from "types/interfaces/ICategory";
import { IModal } from "types/interfaces/IModal";
import { IProduct } from "types/interfaces/IProduct";

type IState = {
  refPortal?: RefObject<HTMLElement | null>;
  isInputFocus: boolean;
};

const initialState: IState = {
  isInputFocus: false,
};

export const ThemeContext = React.createContext<{
  state: IState;
  dispatch: React.Dispatch<Partial<IState>>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IState, changes: Partial<IState>): IState => {
  return { ...state, ...changes };
};

export const ThemeProvider: FC<any> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
