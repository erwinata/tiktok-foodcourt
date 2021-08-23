import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  ProductContext,
  ProductProvider,
} from "routes/Tenant/context/ProductContext";
import Navbar from "components/Navbar";
import History from "routes/Tenant/subroutes/History/History";
import Order from "routes/Tenant/subroutes/Order/Order";
import Settings from "routes/Tenant/subroutes/Settings/Settings";
import { CartProvider } from "routes/Tenant/context/CartContext";
import { TenantProvider } from "routes/Tenant/context/TenantContext";
import useProductContext from "routes/Tenant/context/useProductContext";
import useSimpleEffect from "hooks/useSimpleEffect";
import { INavItem } from "types/interfaces/INavItem";
import { RiHistoryLine, RiFileTextLine, RiSettings3Line } from "react-icons/ri";
import useUserContext from "context/useUserContext";
import { apiGet } from "helpers/api";
import { API_GET_ALL_CARDS, API_GET_PRODUCT } from "constants/api";
import { IProduct } from "types/interfaces/IProduct";
import { ICategory } from "types/interfaces/ICategory";
import { convertProductToFE } from "helpers/convertToFE";
import useTenantContext from "routes/Tenant/context/useTenantContext";
import LoaderOverlay from "components/LoaderOverlay";

const TenantPageContent = () => {
  const { tenantAct } = useTenantContext();
  const { productAct } = useProductContext();
  const { userState } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomerCards = async () => {
    const res = await apiGet(API_GET_ALL_CARDS);
    if (res.data) {
      tenantAct.updateState({
        customerCardIDs: res.data.data.map((item: any) => item.card_number),
      });
    }
  };

  const fetchProductsAndCategories = async (userId: number) => {
    const res = await apiGet(API_GET_PRODUCT, { userId });

    const resProducts: IProduct[] = [];
    const resCategories: ICategory[] = [{ id: 0, nama: "Semua" }];

    (res?.data?.data || []).forEach((categoryItem: any) => {
      resCategories.push(categoryItem);
      categoryItem.subdata.forEach((productItem: any) => {
        resProducts.push(convertProductToFE(productItem));
      });
    });

    productAct.updateState({
      products: resProducts,
      shownProducts: resProducts,
      categories: resCategories,
    });
  };

  useSimpleEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchCustomerCards(),
        fetchProductsAndCategories(userState.user?.id || 0),
      ]);
      setIsLoading(false);
    };

    fetchAll();
  }, []);

  const navItems: INavItem[] = [
    {
      title: "Riwayat",
      pathname: "history",
      icon: <RiHistoryLine size={32} />,
    },
    {
      title: "Order",
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
    <LoaderOverlay isLoading={isLoading} text="Memuat data">
      <Flex justify="space-between" minH="100vh" w="full" bg="gray.100">
        <Navbar pagePathname="tenant" navItems={navItems} type="BOTTOM" />
        <Box flexGrow={1}>
          <Switch>
            <Route exact path="/tenant" component={Order} />
            <Route path="/tenant/history" component={History} />
            <Route path="/tenant/settings" component={Settings} />
            <Route path="/tenant">
              <Redirect to="/tenant" />
            </Route>
          </Switch>
        </Box>
      </Flex>
    </LoaderOverlay>
  );
};

const TenantPage = () => {
  return (
    <TenantProvider>
      <ProductProvider>
        <CartProvider>
          <TenantPageContent />
        </CartProvider>
      </ProductProvider>
    </TenantProvider>
  );
};

export default TenantPage;
