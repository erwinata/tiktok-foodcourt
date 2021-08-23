import {
  Box,
  Flex,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import useProductContext from "routes/Tenant/context/useProductContext";
import Header from "routes/Tenant/subroutes/Order/Menu/components/Header";
import MenuGrid from "routes/Tenant/subroutes/Order/Menu/components/MenuGrid";

const Menu = () => {
  const isMobileSearch = useBreakpointValue({ base: true, md: false });

  const { productState } = useProductContext();

  return (
    <Box flexGrow={1} overflowX="hidden" h="full" w="1px">
      <Tabs h="full" w="full" isLazy>
        <Flex direction="column" h="full" w="full" overflow="hidden">
          <Header />

          <MenuGrid />
        </Flex>
      </Tabs>
    </Box>
  );
};

export default Menu;
