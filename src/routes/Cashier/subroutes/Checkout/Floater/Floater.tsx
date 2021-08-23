import useThemeContext from "context/useThemeContext";
import React from "react";
import useCheckoutContext from "routes/Cashier/context/useCheckoutContext";
import FloaterCheckout from "routes/Cashier/subroutes/Checkout/Floater/FloaterCheckout";
import FloaterNewOrder from "routes/Cashier/subroutes/Checkout/Floater/FloaterNewOrder";

interface Props {}

const Floater = () => {
  const { checkoutState: cartState, checkoutAct: cartAct } =
    useCheckoutContext();
  const { themeHelpers } = useThemeContext();

  if (themeHelpers.isKeyboardOpen) return null;

  return (
    <>
      {themeHelpers.xlScreen && cartState.checkout.orders.length > 0 && (
        <FloaterCheckout />
      )}
      {themeHelpers.xlScreen && cartState.checkout.orders.length === 0 && (
        <FloaterNewOrder />
      )}
    </>
  );
};

export default Floater;
