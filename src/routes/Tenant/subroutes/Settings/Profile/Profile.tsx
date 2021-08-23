import {
  Avatar,
  Box,
  Circle,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  HStack,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import useUserContext from "context/useUserContext";
import { snakeToCamelCase } from "helpers/snakeToCamelCase";
import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const { userState } = useUserContext();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Box px={{ base: "2", md: "4" }} py="4" w="full">
      <Heading px="4" py="2">
        Profil
      </Heading>
      <Box
        bg="white"
        rounded="md"
        shadow="xl"
        w="full"
        maxW="800px"
        minH="80vh"
        mt="4"
      >
        <HStack flex="1" textAlign="left" pt="6" px="4" spacing="4">
          <Circle
            borderColor="gray.100"
            borderWidth={{ base: "4px", sm: "8px" }}
          >
            <Avatar name={userState.user?.name} size={isMobile ? "lg" : "xl"} />
          </Circle>
          <Box w="full">
            <Editable defaultValue="Shilin - Korean Street Food" fontSize="2xl">
              <EditablePreview />
              <EditableInput w="full" />
            </Editable>
            <Text>{userState.user?.name}</Text>
            <Text fontSize="sm" mt="0.5">
              Join: 21 Maret 2021
            </Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default Profile;
