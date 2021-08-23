import {
  Flex,
  HStack,
  Heading,
  Tag,
  Spacer,
  Button,
  Stack,
  Input,
  Image,
  Text,
  useNumberInput,
  Box,
  Avatar,
  IconButton,
  InputGroup,
  InputLeftElement,
  ButtonGroup,
  Grid,
  Center,
  Circle,
} from "@chakra-ui/react";
import useThemeContext from "context/useThemeContext";
import dayjs from "dayjs";
import useSimpleEffect from "hooks/useSimpleEffect";
import React, { useEffect, useRef } from "react";
import DayPicker from "react-day-picker";
import { RiUser3Fill } from "react-icons/ri";
import ModalLoadDraft from "routes/Tenant/subroutes/Order/Modal/ModalLoadDraft";

interface Props {
  isOpen: boolean;
}

const CalendarPicker: React.FC<Props> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <Box pos="absolute" bg="white" shadow="lg" zIndex="10">
      <DayPicker
        onDayClick={(day) => {
          console.log(day);
        }}
        selectedDays={new Date()}
        disabledDays={{ after: new Date() }}
        // disabledDays={{  }}
      />
    </Box>
  );
};

export default CalendarPicker;
