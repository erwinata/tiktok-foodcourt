import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
import dayjs from "dayjs";
import TabChart from "routes/Tenant/subroutes/History/components/TabChart";
import TabOrderList from "routes/Tenant/subroutes/History/components/TabOrderList";

const History = () => {
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
    <Stack
      px={{ base: "2", md: "4" }}
      py="4"
      w="full"
      maxW="1000px"
      spacing="4"
    >
      <Heading px="4" py="2">
        Riwayat Order
      </Heading>
      <Box bg="white" py="4" minH="80vh" mt="4">
        <Tabs>
          <TabList px="2">
            <Tab>Statistik</Tab>
            <Tab>List Riwayat Order</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TabChart />
            </TabPanel>
            <TabPanel>
              <TabOrderList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Stack>
  );
};

export default History;
