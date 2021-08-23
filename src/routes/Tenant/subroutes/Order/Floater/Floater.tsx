import {
  Flex,
  HStack,
  Heading,
  Tag,
  Spacer,
  Button,
  Stack,
  Input,
  Image,
  Text,
  useNumberInput,
  Box,
  Avatar,
  IconButton,
  InputGroup,
  InputLeftElement,
  ButtonGroup,
  Grid,
  Center,
  Circle,
} from "@chakra-ui/react";
import React from "react";
import {
  RiAddFill,
  RiNotification3Fill,
  RiSearchLine,
  RiLayoutGridFill,
  RiLayoutLine,
  RiArrowRightFill,
  RiArrowRightLine,
  RiUser2Line,
  RiUser3Line,
  RiUserFill,
  RiUser3Fill,
  RiCloseLine,
} from "react-icons/ri";
import CircleIcon from "components/CircleIcon";
import useCartContext from "routes/Tenant/context/useCartContext";
import useThemeContext from "context/useThemeContext";
import FloaterCheckout from "routes/Tenant/subroutes/Order/Floater/FloaterCheckout";
import FloaterNewOrder from "routes/Tenant/subroutes/Order/Floater/FloaterNewOrder";

interface Props {}

const Floater = () => {
  const { cartState, cartAct } = useCartContext();
  const { themeHelpers } = useThemeContext();

  if (themeHelpers.isKeyboardOpen) return null;

  return (
    <>
      {themeHelpers.xlScreen && cartState.order.customer && <FloaterCheckout />}
      {themeHelpers.xlScreen && !cartState.order.customer && (
        <FloaterNewOrder />
      )}
    </>
  );
};

export default Floater;
