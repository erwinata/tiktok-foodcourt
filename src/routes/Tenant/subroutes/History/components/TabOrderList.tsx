import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Pagination from "components/Pagination";
import SelectDate from "components/SelectDate";
import { API_GET_ALL_ORDER_BY_TENANT } from "constants/api";
import useThemeContext from "context/useThemeContext";
import useUserContext from "context/useUserContext";
import { apiGet } from "helpers/api";
import { convertOrderToFE } from "helpers/convertToFE";
import useSimpleEffect from "hooks/useSimpleEffect";
import React, { useState } from "react";
import { RiFileForbidLine, RiSearchLine } from "react-icons/ri";
import HistoryItems from "routes/Tenant/subroutes/History/components/HistoryItems";
import { IOrder } from "types/interfaces/IOrder";

const TabOrderList = () => {
  const { themeHelpers } = useThemeContext();
  const { userState, userAct } = useUserContext();
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const fetchOrder = async () => {
    setIsLoading(true);

    const resApi = await apiGet(API_GET_ALL_ORDER_BY_TENANT, {
      userId: userState.user?.id,
      isPending: 2,
      isToday: 0,
    });

    if (resApi.data) {
      const resOrderList: IOrder[] = resApi.data.data.map((item: any) =>
        convertOrderToFE(item)
      );
      setOrderList(resOrderList);
    }

    setIsLoading(false);
  };

  useSimpleEffect(() => {
    fetchOrder();
  }, []);

  const printOrder = (orderToLoad: IOrder) => {};

  return (
    <Box>
      <Box maxW="600px">
        <Heading fontSize="sm">Filter</Heading>
        <Stack py="4">
          <SelectDate />

          <HStack>
            <InputGroup rounded="lg" w="full" bg="white">
              <Input placeholder="Nomor Kartu / Nomor Order" />
            </InputGroup>

            <Button colorScheme="red" leftIcon={<RiSearchLine />} px="10">
              Cari
            </Button>
          </HStack>
        </Stack>
      </Box>
      {isLoading && (
        <Stack py="32" align="center">
          <Spinner size="xl" />
          <Text color="gray.500" fontSize="2xl">
            Memuat data order
          </Text>
        </Stack>
      )}
      {!isLoading && orderList.length === 0 && (
        <Stack py="32" textAlign="center" align="center" color="gray.500">
          <Box color="gray.300">
            <RiFileForbidLine size="100px" />
          </Box>
          <Text fontSize="2xl">Tidak ada data ditemukan</Text>
          <Text>Silahkan atur filter untuk melihat data lainnya</Text>
        </Stack>
      )}
      {!isLoading && orderList.length > 0 && (
        <>
          <HistoryItems orderList={orderList} />
          <Pagination />
        </>
      )}
    </Box>
  );
};

export default TabOrderList;
