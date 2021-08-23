import React, { FC, useReducer } from "react";

type IState = {
  customerCardIDs: string[];
};

const initialState: IState = {
  customerCardIDs: [],
};

export const TenantContext = React.createContext<{
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

export const TenantProvider: FC<any> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TenantContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TenantContext.Provider>
  );
};
