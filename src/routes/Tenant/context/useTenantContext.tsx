import { useCallback, useContext } from "react";
import { TenantContext } from "routes/Tenant/context/TenantContext";

const useTenantContext = () => {
  const { state, dispatch } = useContext(TenantContext);

  const updateState = useCallback(
    (newPartialState: Partial<typeof state>) => {
      dispatch(newPartialState);
    },
    [dispatch]
  );

  const verifyCustomerCardId = useCallback(
    (cardId: string) => {
      return state.customerCardIDs.includes(cardId);
    },
    [state.customerCardIDs]
  );

  return {
    tenantState: state,
    tenantAct: { updateState, verifyCustomerCardId },
  };
};

export default useTenantContext;
