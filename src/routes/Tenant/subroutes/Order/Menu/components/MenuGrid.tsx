import { Box, Grid } from "@chakra-ui/react";
import useThemeContext from "context/useThemeContext";
import React from "react";
import { sampleProducts } from "routes/Tenant/constants/samples";
import useCartContext from "routes/Tenant/context/useCartContext";
import useProductContext from "routes/Tenant/context/useProductContext";
import MenuItem from "routes/Tenant/subroutes/Order/Menu/components/MenuItem";

interface Props {}

const MenuGrid = () => {
  const { productState } = useProductContext();
  const { cartState } = useCartContext();

  const { themeHelpers } = useThemeContext();

  return (
    <Box h="full" w="full" flexGrow={1} py="4" overflowY="scroll">
      <Grid
        templateColumns={{
          base: "repeat(1fr)",
          sm: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
        gap={{ base: 3, md: 4 }}
        px={{ base: "2", md: "4" }}
        w="full"
      >
        {productState.shownProducts.map((item, index) => {
          const qty =
            cartState.order.items.find(
              (orderItem) => orderItem.product.id === item.id
            )?.qty || 0;

          return <MenuItem product={item} qty={qty} key={index} />;
        })}
      </Grid>
      <Box h={themeHelpers.smScreen ? "140px" : "100px"} />
    </Box>
  );
};

export default MenuGrid;
