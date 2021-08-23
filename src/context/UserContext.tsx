import { COOKIE_TIKTOK_LOGIN } from "constants/cookie";
import { getCookie } from "helpers/cookie";
import React, { FC, useReducer } from "react";
import { sampleNotifs } from "routes/Tenant/constants/samples";
import { INotif } from "types/interfaces/INotif";
import { IUser } from "types/interfaces/IUser";

type IState = {
  user?: IUser;
  notifs: INotif[];
};

const initialState: IState = {
  user: getCookie(COOKIE_TIKTOK_LOGIN)
    ? JSON.parse(getCookie(COOKIE_TIKTOK_LOGIN)!)
    : undefined,
  notifs: sampleNotifs,
};

export const UserContext = React.createContext<{
  state: IState;
  dispatch: React.Dispatch<Partial<IState>>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: IState, changes: Partial<IState>): IState => {
  return { ...state, ...changes };
};

export const UserProvider: FC<any> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
