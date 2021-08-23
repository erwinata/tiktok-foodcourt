import {
  Avatar,
  AvatarBadge,
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spacer,
  Stack,
  Tab,
  TabList,
  Text,
} from "@chakra-ui/react";
import useThemeContext from "context/useThemeContext";
import useUserContext from "context/useUserContext";
import dayjs from "dayjs";
import { simpleRelativeTime } from "helpers/date";
import React, { useMemo } from "react";
import {
  RiEye2Line,
  RiEyeFill,
  RiEyeLine,
  RiEyeOffFill,
  RiEyeOffLine,
} from "react-icons/ri";
import { textNotifGroup } from "routes/Tenant/constants/text";
import useProductContext from "routes/Tenant/context/useProductContext";
import useTenantContext from "routes/Tenant/context/useTenantContext";
import Search from "routes/Tenant/subroutes/Order/Menu/components/Search";
import { INotif } from "types/interfaces/INotif";

interface Props {
  notifs: INotif[];
}

const Notification: React.FC<Props> = ({ notifs }) => {
  // const { tenantState, tenantAct } = useTenantContext();
  const { userState } = useUserContext();
  const { themeState } = useThemeContext();

  const groupedNotifs = useMemo(() => {
    const result: INotif[][] = [];
    result.push(notifs.filter((item) => dayjs().isSame(item.date, "d")));
    result.push(
      notifs.filter(
        (item) =>
          dayjs().isSame(item.date, "w") && !dayjs().isSame(item.date, "d")
      )
    );
    result.push(
      notifs.filter(
        (item) =>
          dayjs().isSame(item.date, "M") &&
          !dayjs().isSame(item.date, "w") &&
          !dayjs().isSame(item.date, "d")
      )
    );
    result.push(
      notifs.filter(
        (item) =>
          !dayjs().isSame(item.date, "M") &&
          !dayjs().isSame(item.date, "w") &&
          !dayjs().isSame(item.date, "d")
      )
    );
    return result;
  }, [notifs]);

  return (
    <Portal containerRef={themeState.refPortal}>
      <PopoverContent
        w="90vw"
        maxW="500px"
        overflowY="scroll"
        shadow="dark-lg"
        _focus={{
          outline: "none",
        }}
      >
        <PopoverCloseButton />
        <PopoverBody px="0" h="70vh" maxH="600px">
          <Text px="4" py="2" fontWeight="bold">
            {userState.user?.name}
          </Text>

          {groupedNotifs.map((groupedNotifItem, index) => {
            if (groupedNotifItem.length > 0) {
              return (
                <Box key={index}>
                  <Text fontSize="sm" color="gray.500" py="2" px="4">
                    {textNotifGroup[index]}
                  </Text>
                  <Stack mb="2" spacing="0">
                    {groupedNotifItem.map((notifItem, index) => (
                      <HStack
                        align="flex-start"
                        py="2"
                        px="4"
                        _hover={{ bg: "gray.100" }}
                        borderBottom="1px"
                        borderColor="gray.100"
                        key={index}
                      >
                        {notifItem.isNew && (
                          <Circle
                            bg="red.500"
                            size="3"
                            mt="1.5"
                            border="2px"
                            borderColor="red.100"
                          />
                        )}
                        <Text ml="1">{notifItem.text}</Text>
                        <Spacer />
                        <Text
                          fontSize="sm"
                          color="gray.500"
                          textAlign="right"
                          whiteSpace="nowrap"
                        >
                          {simpleRelativeTime(notifItem.date)}
                        </Text>
                      </HStack>
                    ))}
                  </Stack>
                </Box>
              );
            }
            return null;
          })}
        </PopoverBody>
      </PopoverContent>
    </Portal>
  );
};

export default Notification;
