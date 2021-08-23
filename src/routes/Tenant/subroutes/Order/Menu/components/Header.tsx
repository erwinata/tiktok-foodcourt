import {
  Avatar,
  AvatarBadge,
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spacer,
  Stack,
  Tab,
  TabList,
  Text,
} from "@chakra-ui/react";
import useThemeContext from "context/useThemeContext";
import useUserContext from "context/useUserContext";
import { isPWA } from "helpers/pwa";
import React from "react";
import {
  RiEye2Line,
  RiEyeFill,
  RiEyeLine,
  RiEyeOffFill,
  RiEyeOffLine,
} from "react-icons/ri";
import useProductContext from "routes/Tenant/context/useProductContext";
import CashierInfo from "routes/Tenant/subroutes/Order/Menu/components/CashierInfo";
import Search from "routes/Tenant/subroutes/Order/Menu/components/Search";

interface Props {}

const Header = () => {
  const { userState } = useUserContext();
  const { productState, productAct } = useProductContext();
  const { themeState } = useThemeContext();

  return (
    <Box bg="white" shadow="md" pt="2" zIndex="1" w="100%" pos="sticky" top="0">
      <HStack pt="2" px={{ base: "4", md: "8" }} w="100%">
        <Stack spacing="1">
          <Heading fontSize={["2xl", "3xl", null, "4xl"]}>
            [Nama Tenant di sini]
          </Heading>
          {/* <Text fontSize={["sm", "md", null, "lg"]}>Tenant 123</Text> */}
        </Stack>
        <Spacer />
        <CashierInfo />
      </HStack>

      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        py="1"
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        w="100%"
      >
        <TabList
          // flexGrow={1}
          flexShrink={1}
          borderBottom="none"
          overflowX="scroll"
          overflowY="hidden"
          px={{ base: "2", md: "4" }}
          mt="2"
          w="100%"
          className="minimalScrollbar"
        >
          {productState.categories.map((item, index) => (
            <Tab
              whiteSpace="nowrap"
              fontSize={["sm", null, "md"]}
              my="1"
              _selected={{
                fontWeight: "bold",
                outline: "none",
                color: "white",
                background: "red.500",
                rounded: "full",
              }}
              _focus={{ outline: "none" }}
              onClick={() => {
                productAct.selectCategory(item.id);
              }}
              key={item.id}
            >
              {item.nama}
            </Tab>
          ))}
        </TabList>
        <Search />
      </Flex>
    </Box>
  );
};

export default Header;
