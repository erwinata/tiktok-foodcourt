import {
  Box,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Tab,
  TabList,
  Text,
} from "@chakra-ui/react";
import useThemeContext from "context/useThemeContext";
import React from "react";
import useProductContext from "routes/Tenant/context/useProductContext";
import CashierInfo from "routes/Tenant/subroutes/Order/Menu/components/CashierInfo";
import Search from "routes/Tenant/subroutes/Order/Menu/components/Search";

interface Props {}

const Header = () => {
  const { productState, productAct } = useProductContext();
  const { themeState } = useThemeContext();

  return (
    <Box bg="white" shadow="md" py="4" zIndex="1" w="100%" pos="sticky" top="0">
      <HStack pt="2" align="flex-start" px={{ base: "4", md: "8" }} w="100%">
        <Stack spacing="1">
          <Text fontSize={["sm", "md", null, "lg"]}>Kasir</Text>
          <Heading fontSize={["2xl", "3xl", null, "4xl"]}>
            Warung Tiktok Yogyakarta
          </Heading>
        </Stack>
        <Spacer />
        <CashierInfo />
      </HStack>
    </Box>
  );
};

export default Header;
