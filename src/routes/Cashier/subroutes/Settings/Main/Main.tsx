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
    <Flex px={{ base: "2", md: "4" }} py="4" w="full">
      <Box
        bg="white"
        px={{ base: "0", md: "4" }}
        py="4"
        rounded="md"
        shadow="xl"
        w="full"
        maxW="800px"
        minH="90vh"
      >
        <Heading px="4" py="2">
          Pengaturan
        </Heading>

        <HStack flex="1" textAlign="left" py="3" px="4" mt="4">
          <Circle border="4px" borderColor="gray.100">
            <Avatar
              name="Putri Ayu Rizky"
              // src="https://bit.ly/dan-abramov"
            ></Avatar>
          </Circle>
          <Text fontSize="lg">Putri Ayu Rizky</Text>
        </HStack>

        <Stack mt="4" spacing="0" borderTop="1px" borderColor="gray.100">
          <HStack
            flex="1"
            textAlign="left"
            py="3"
            px="6"
            borderBottom="1px"
            borderColor="gray.100"
            _hover={{ bg: "gray.100" }}
            cursor="pointer"
            onClick={() => history.push("./settings/profile")}
          >
            <Text fontSize="lg">Profil</Text>
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
            _hover={{ bg: "gray.100" }}
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
            _hover={{ bg: "gray.100" }}
            color="red.500"
            cursor="pointer"
            onClick={logout}
          >
            <Text fontSize="lg">Logout</Text>
          </HStack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Main;
