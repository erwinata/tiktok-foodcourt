import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import useThemeContext from "context/useThemeContext";
import useSimpleEffect from "hooks/useSimpleEffect";
import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import useCartContext from "routes/Tenant/context/useCartContext";
import useProductContext from "routes/Tenant/context/useProductContext";

const Search = () => {
  const size = useBreakpointValue({ base: "md", md: "lg" });

  const [inputSearch, setInputSearch] = useState("");
  const { cartState } = useCartContext();
  const { productAct, productState } = useProductContext();
  const { themeHelpers } = useThemeContext();

  useSimpleEffect(() => {
    setInputSearch("");
    productAct.searchProducts("");
  }, [cartState.order.customer]);

  return (
    <Box
      flexShrink={0}
      w={{ base: "full", md: "30%" }}
      maxW={{ base: "auto", md: "500px" }}
      minW={{ base: "auto", md: "300px" }}
      mx={{ base: "", md: "2" }}
      mt="3"
      mb="1"
      px="4"
    >
      <InputGroup size={size} rounded="lg" w="full">
        <Input
          placeholder="Cari Menu"
          value={inputSearch}
          onChange={(e) => {
            setInputSearch(e.target.value);
            productAct.searchProducts(e.target.value);
          }}
          onFocus={() => themeHelpers.setIsInputFocus(true)}
          onBlur={() => themeHelpers.setIsInputFocus(false)}
        />
        <InputRightElement
          pointerEvents="none"
          color="gray.300"
          children={<RiSearchLine size={24} />}
        />
      </InputGroup>
    </Box>
  );
};

export default Search;
