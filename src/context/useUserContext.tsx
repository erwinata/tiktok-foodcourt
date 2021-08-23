import { UserContext } from "context/UserContext";
import { useCallback, useContext } from "react";
import { IUser } from "types/interfaces/IUser";

const useUserContext = () => {
  const { state, dispatch } = useContext(UserContext);

  const setUser = useCallback(
    (user: IUser) => {
      dispatch({ user });
    },
    [dispatch]
  );

  const readNotifs = useCallback(() => {
    const resNotifs = state.notifs.map((item) => ({ ...item, isNew: false }));
    dispatch({ notifs: resNotifs });
  }, [dispatch, state.notifs]);

  return {
    userState: state,
    userAct: {
      setUser,
      readNotifs,
    },
  };
};

export default useUserContext;
