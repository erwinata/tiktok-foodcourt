import React, { FC, useReducer } from "react";
import {
  sampleCategories,
  sampleProducts,
} from "routes/Tenant/constants/samples";
import { ICategory } from "types/interfaces/ICategory";
import { IProduct } from "types/interfaces/IProduct";

type IState = {
  products: IProduct[];
  shownProducts: IProduct[];
  searchQuery: string;
  activeCategory: number;
  categories: ICategory[];
};

const initialState: IState = {
  products: [],
  shownProducts: [],
  searchQuery: "",
  activeCategory: 0,
  categories: [],
};

export const ProductContext = React.createContext<{
  state: IState;
  dispatch: React.Dispatch<Partial<IState>>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IState, changes: Partial<IState>): IState => {
  console.log("changes", changes);
  console.log({ ...state, ...changes });
  return { ...state, ...changes };
};

export const ProductProvider: FC<any> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ProductContext.Provider>
  );
};
