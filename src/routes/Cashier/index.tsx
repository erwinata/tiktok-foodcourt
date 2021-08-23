import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  ProductContext,
  ProductProvider,
} from "routes/Cashier/context/ProductContext";
import Navbar from "components/Navbar";
import History from "routes/Cashier/subroutes/History/History";
import Checkout from "routes/Cashier/subroutes/Checkout/Checkout";
import Settings from "routes/Cashier/subroutes/Settings/Settings";
import { CheckoutProvider } from "routes/Cashier/context/CheckoutContext";
import useProductContext from "routes/Cashier/context/useProductContext";
import useSimpleEffect from "hooks/useSimpleEffect";
import { INavItem } from "types/interfaces/INavItem";
import { RiFileTextLine, RiHistoryLine, RiSettings3Line } from "react-icons/ri";
import { API_GET_ALL_CARDS } from "constants/api";
import { apiGet } from "helpers/api";
import useCheckoutContext from "routes/Cashier/context/useCheckoutContext";

const CashierPageContent = () => {
  const { checkoutAct } = useCheckoutContext();
  const { productAct } = useProductContext();

  const fetchCustomerCards = async () => {
    const res = await apiGet(API_GET_ALL_CARDS);
    if (res.data) {
      checkoutAct.updateState({
        customerCardIDs: res.data.data.map((item: any) => item.card_number),
      });
    }
  };

  useSimpleEffect(() => {
    fetchCustomerCards();
    productAct.fetchProductsAndCategories(2);
  }, []);

  const navItems: INavItem[] = [
    {
      title: "Riwayat",
      pathname: "history",
      icon: <RiHistoryLine size={32} />,
    },
    {
      title: "Checkout",
      pathname: "",
      icon: <RiFileTextLine size={32} />,
      isMain: true,
    },
    {
      title: "Pengaturan",
      pathname: "settings",
      icon: <RiSettings3Line size={32} />,
    },
  ];

  return (
    <Flex justify="space-between" minH="100vh" w="full" bg="gray.100">
      <Navbar pagePathname="cashier" navItems={navItems} type="BOTTOM" />
      <Box flexGrow={1}>
        <Switch>
          <Route exact path="/cashier" component={Checkout} />
          <Route path="/cashier/history" component={History} />
          <Route path="/cashier/settings" component={Settings} />
          <Route path="/cashier">
            <Redirect to="/cashier" />
          </Route>
        </Switch>
      </Box>
    </Flex>
  );
};

const CashierPage = () => {
  return (
    <ProductProvider>
      <CheckoutProvider>
        <CashierPageContent />
      </CheckoutProvider>
    </ProductProvider>
  );
};

export default CashierPage;
