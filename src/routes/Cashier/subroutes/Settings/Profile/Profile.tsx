import {
  Avatar,
  Box,
  Circle,
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
import { snakeToCamelCase } from "helpers/snakeToCamelCase";
import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const isMobile = useBreakpointValue({ base: true, sm: false });

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
        <HStack px="4" py="2" spacing="4">
          <RiArrowLeftLine size={32} onClick={() => history.goBack()} />
          <Heading>Profil</Heading>
        </HStack>

        <HStack
          flex="1"
          textAlign="left"
          py="3"
          px="4"
          mt="4"
          spacing="4"
          // align="flex-start"
        >
          <Circle
            borderColor="gray.100"
            borderWidth={{ base: "4px", sm: "8px" }}
          >
            <Avatar name="Putri Ayu Rizky" size={isMobile ? "lg" : "xl"} />
          </Circle>
          <Box>
            <Heading fontSize={{ base: "xl", md: "2xl" }} fontWeight="normal">
              Putri Ayu Rizky
            </Heading>
            <Text fontSize="sm" mt="0.5">
              Tgl join: 21 Maret 2021
            </Text>
            <HStack mt="2">
              <Circle size="2" bg="green.400" />
              <Text>Dalam shift kerja</Text>
            </HStack>
          </Box>
        </HStack>

        <StatGroup
          border="1px"
          borderColor="gray.300"
          rounded="lg"
          mt="4"
          mx="4"
          px="4"
          py="4"
        >
          <Stat>
            <StatLabel fontSize={{ base: "xs", md: "md" }}>
              Pesanan dilayani
            </StatLabel>
            <StatNumber
              color="gray.500"
              fontWeight="normal"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              321x
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize={{ base: "xs", md: "md" }}>Presensi</StatLabel>
            <StatNumber
              color="gray.500"
              fontWeight="normal"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              98.7%
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize={{ base: "xs", md: "md" }}>
              Total hari bekerja
            </StatLabel>
            <StatNumber
              color="gray.500"
              fontWeight="normal"
              fontSize={{ base: "xl", md: "2xl" }}
            >
              123 hari
            </StatNumber>
          </Stat>
        </StatGroup>
      </Box>
    </Flex>
  );
};

export default Profile;
