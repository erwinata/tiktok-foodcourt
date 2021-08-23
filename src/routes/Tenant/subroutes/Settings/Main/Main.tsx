import {
  Avatar,
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { COOKIE_TIKTOK_LOGIN } from "constants/cookie";
import useUserContext from "context/useUserContext";
import { clearCookie } from "helpers/cookie";
import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";

const Main = () => {
  const { userState, userAct } = useUserContext();
  const history = useHistory();

  const logout = () => {
    userAct.setUser(undefined!);
    clearCookie(COOKIE_TIKTOK_LOGIN);
    history.push("/login");
  };

  return (
    <Box px={{ base: "2", md: "4" }} py="4" w="full">
      <Heading px="4" py="2">
        Pengaturan
      </Heading>

      <Box bg="white" minH="80vh" mt="4">
        <HStack flex="1" textAlign="left" py="4" px="4">
          <Circle border="4px" borderColor="gray.100">
            <Avatar name={userState.user?.name} />
          </Circle>
          <Text fontSize="lg">{userState.user?.name}</Text>
        </HStack>

        <Stack mt="2" spacing="0" borderTop="1px" borderColor="gray.100">
          <HStack
            flex="1"
            textAlign="left"
            py="3"
            px="6"
            borderBottom="1px"
            borderColor="gray.100"
            _hover={{ bg: "gray.50" }}
            cursor="pointer"
            onClick={() => history.push("./settings/profile")}
          >
            <Text fontSize="lg">Profil Tenant</Text>
            <Spacer />
            <RiArrowRightSLine size={24} />
          </HStack>
          <HStack
            flex="1"
            textAlign="left"
            py="3"
            px="6"
            borderBottom="1px"
            borderColor="gray.100"
            _hover={{ bg: "gray.50" }}
            cursor="pointer"
          >
            <Text fontSize="lg">Ubah Password</Text>
            <Spacer />
            <RiArrowRightSLine size={24} />
          </HStack>
          <HStack
            flex="1"
            textAlign="left"
            py="3"
            px="6"
            borderBottom="1px"
            borderColor="gray.100"
            _hover={{ bg: "gray.50" }}
            color="red.500"
            cursor="pointer"
            onClick={logout}
          >
            <Text fontSize="lg">Logout</Text>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Main;
