import { Box, Divider, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import {
  AreaChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import dayjs from "dayjs";
import useThemeContext from "context/useThemeContext";

interface Props {}

const TabChart: React.FC<Props> = () => {
  const {
    themeHelpers: { smValue },
  } = useThemeContext();

  const data = [
    { name: "qwe", date: dayjs().subtract(2, "d").toDate(), penjualan: 203 },
    { name: "qwe", date: dayjs().subtract(1, "d").toDate(), penjualan: 400 },
  ];

  return (
    <Box>
      <Flex
        mt="2"
        mb="8"
        mx="-1"
        rounded="md"
        w="full"
        spacing="4"
        flexWrap={smValue("wrap", "no-wrap")}
      >
        {[0, 1, 2, 3].map((item) => (
          <Box w={smValue("50%", "100%")} px="1" py="1">
            <Box bg="gray.50" px="4" py="5">
              <Heading fontSize="sm">Penjualan Hari ini</Heading>
              <Text
                fontSize="3xl"
                fontWeight="semibold"
                mt="2"
                color="gray.500"
              >
                94
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>

      <Heading fontSize="sm" mb="6">
        Statistik Penjualan Minggu ini
      </Heading>
      <Box mx="-4">
        <ResponsiveContainer width="95%" height={400}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2695f0" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2695f0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis
              dataKey="name"
              // hasTick
              // scale="time"
              // tickFormatter={dateFormatter}
              // type="number"
              // domain={domain}
              // ticks={ticks}
            />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="penjualan"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default TabChart;
