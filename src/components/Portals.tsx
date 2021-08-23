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
import useThemeContext from "context/useThemeContext";
import useSimpleEffect from "hooks/useSimpleEffect";
import React, { useEffect, useRef } from "react";
import { RiUser3Fill } from "react-icons/ri";
import ModalLoadDraft from "routes/Tenant/subroutes/Order/Modal/ModalLoadDraft";

interface Props {
  size?: string;
}

const Portals = () => {
  const { themeState, themeAct } = useThemeContext();

  const refPortal = useRef(null);

  useSimpleEffect(() => {
    themeAct.setRefPortal(refPortal);
  }, []);

  return <div ref={refPortal}></div>;
};

export default Portals;
