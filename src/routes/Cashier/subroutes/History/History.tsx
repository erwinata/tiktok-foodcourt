import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  Select,
  Stack,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Pagination from "components/Pagination";
import SelectDate from "components/SelectDate";
import useThemeContext from "context/useThemeContext";
import React from "react";
import { RiSearchLine } from "react-icons/ri";
import HistoryItems from "routes/Cashier/subroutes/History/components/HistoryItems";

const History = () => {
  const { themeHelpers } = useThemeContext();

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
          Riwayat Order
        </Heading>

        <Tabs>
          <TabPanels>
            <TabPanel p="0">
              <Stack py="4">
                <HStack px="4">
                  <Box w="35%">
                    <Text as="label" fontSize="xs" pl="2">
                      Status Lunas
                    </Text>
                    <Select
                      placeholder="Lunas"
                      size={themeHelpers.smScreen ? "sm" : "md"}
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                  </Box>
                  <Box w="65%">
                    <Text as="label" fontSize="xs" pl="2">
                      Tanggal
                    </Text>
                    <SelectDate />
                    {/* <Select
                      size={themeHelpers.smScreen ? "sm" : "md"}
                      onClick={onToggle}
                    >
                      <option value="option1">12 Feb 2021 - 20 Mar 2021</option>
                    </Select> */}
                  </Box>
                </HStack>

                <HStack px="4">
                  <InputGroup rounded="lg" w="full">
                    <Input placeholder="Nama / Nomor Customer" />
                  </InputGroup>

                  <Button colorScheme="red" leftIcon={<RiSearchLine />} px="10">
                    Cari
                  </Button>
                </HStack>
              </Stack>

              <HistoryItems />
              <Pagination />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default History;
