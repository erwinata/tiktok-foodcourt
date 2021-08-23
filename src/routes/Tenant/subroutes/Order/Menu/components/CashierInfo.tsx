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
import React, { useMemo, useState } from "react";
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
import Notification from "routes/Tenant/subroutes/Order/Menu/components/Notification";
import Search from "routes/Tenant/subroutes/Order/Menu/components/Search";
import { INotif } from "types/interfaces/INotif";

interface Props {}

const CashierInfo = () => {
  const { userState, userAct } = useUserContext();
  const { themeState } = useThemeContext();
  const [notifsToOpen, setNotifsToOpen] = useState<INotif[]>([]);

  const newNotifCount = userState.notifs.filter((item) => item.isNew).length;

  const openNotifs = () => {
    setNotifsToOpen(userState.notifs);
    userAct.readNotifs();
  };

  return (
    <Stack spacing="2" align="flex-end">
      <HStack>
        <Text
          as="span"
          fontWeight="bold"
          fontSize="lg"
          display={{ base: "none", md: "block" }}
        >
          {userState.user?.name}
        </Text>
        <Popover placement="bottom-end" isLazy>
          <PopoverTrigger>
            <Circle border="4px" borderColor="gray.100" onClick={openNotifs}>
              <Avatar name={userState.user?.name}>
                {newNotifCount > 0 && (
                  <AvatarBadge
                    bg="red.500"
                    color="white"
                    fontSize="sm"
                    boxSize="2em"
                  >
                    {newNotifCount}
                  </AvatarBadge>
                )}
              </Avatar>
            </Circle>
          </PopoverTrigger>
          <Portal containerRef={themeState.refPortal}>
            <Notification notifs={notifsToOpen} />
          </Portal>
        </Popover>
      </HStack>
    </Stack>
  );
};

export default CashierInfo;
