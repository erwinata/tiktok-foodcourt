import {
  Flex,
  HStack,
  Button,
  Text,
  Box,
  useDisclosure,
  useOutsideClick,
  Input,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { isDateBetween } from "helpers/date";
import React, { useEffect, useMemo, useRef, useState } from "react";
import DayPicker from "react-day-picker";
import { RiCalendar2Line, RiUser3Fill } from "react-icons/ri";
import "./style.css";

interface Props {}

const SelectDate: React.FC<Props> = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<Date[]>([
    undefined!,
    undefined!,
  ]);
  const [start, setStart] = useState<Date>(undefined!);
  const [end, setEnd] = useState<Date>(undefined!);
  const rangeSelection = true;
  const selectedDays = rangeSelection ? [start, { start, end }] : start;

  const refCalendar = React.useRef<any>();
  useOutsideClick({
    ref: refCalendar,
    handler: () => isOpen && closeCalendar(),
  });

  const modifiers = {
    weekend: { daysOfWeek: [0, 6] },
    start,
    end,
  };

  const handleClickDate = (day: Date, dayClickModifiers: any) => {
    if (dayClickModifiers.disabled) {
      return;
    }

    console.log(day);

    const dayStart = dayjs(start);
    const dayEnd = dayjs(end);
    const dayClicked = dayjs(day);
    console.log(dayStart.isValid(), dayEnd.isValid());

    if (rangeSelection) {
      if (!start && !end) {
        setStart(day);
        setEnd(day);
      } else if (
        dayStart.isSame(dayEnd, "day") &&
        !dayEnd.isSame(dayClicked, "day")
      ) {
        if (dayStart.isAfter(dayClicked)) {
          setStart(day);
          setEnd(dayStart.toDate());
        } else {
          setEnd(day);
        }
      } else if (!isDateBetween(day, start, end, true, true)) {
        setStart(day);
        setEnd(day);
      } else {
        setStart(undefined!);
        setEnd(undefined!);
      }
    } else {
      const resultDate = dayStart.isSame(dayClicked, "day") ? undefined! : day;
      setStart(resultDate);
      setEnd(resultDate);
      // handleApplyDate(resultDate, resultDate);
    }
  };

  const closeCalendar = () => {
    setStart(undefined!);
    setEnd(undefined!);
    onToggle();
  };

  const handleApplyDate = () => {
    setSelectedDate([start, end]);
    closeCalendar();
  };

  const displayText = (start: Date, end: Date) => {
    let res = start && dayjs(start).format("D MMM YYYY");
    if (end && start !== end) res += " - " + dayjs(end).format("D MMM YYYY");
    return res;
  };

  return (
    <Box
      w="full"
      rounded="md"
      borderWidth={1}
      borderColor="gray.200"
      px="4"
      h="10"
      bg="white"
      onClick={onToggle}
      userSelect="none"
    >
      <Flex h="full" align="center" justify="space-between">
        <Input
          placeholder="Tanggal"
          variant="unstyled"
          value={displayText(start, end)}
          readOnly
        />
        <RiCalendar2Line color="currentColor" />
      </Flex>

      {isOpen && (
        <Box
          pos="absolute"
          bg="white"
          shadow="lg"
          zIndex="10"
          borderWidth={1}
          borderColor="gray.300"
          pb="4"
          onClick={(e) => e.stopPropagation()}
          ref={refCalendar}
        >
          <DayPicker
            modifiers={modifiers}
            onDayClick={handleClickDate}
            selectedDays={[start, { from: start, to: end }]}
            disabledDays={{ after: new Date() }}
            numberOfMonths={2}
          />
          <HStack px="6" py="2" justify="space-between">
            <Text>{displayText(start, end)}</Text>
            <HStack>
              <Button onClick={closeCalendar}>Cancel</Button>
              <Button colorScheme="red" w="120px" onClick={handleApplyDate}>
                OK
              </Button>
            </HStack>
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default SelectDate;
