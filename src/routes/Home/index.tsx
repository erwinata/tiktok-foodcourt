import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
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

const HomePage = () => {
  return (
    <Stack align="center" w="full" py="20" spacing="5">
      <Heading>Welcome Foodcourt Tiktok app</Heading>
      <Stack align="center" w="full">
        <Link to="/tenant">
          <Button size="lg" colorScheme="blue">
            Go to Tenant
          </Button>
        </Link>
        <Link to="/cashier">
          <Button size="lg" colorScheme="blue">
            Go to Cashier
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default HomePage;
