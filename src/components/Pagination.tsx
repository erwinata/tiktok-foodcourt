import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
  Image,
  Input,
  useNumberInput,
  Tag,
  useDisclosure,
  Switch,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Badge,
  InputGroup,
  InputRightElement,
  Divider,
  Square,
  Center,
  ButtonGroup,
  Select,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSearchLine,
} from "react-icons/ri";

interface PageButtonProps {
  isActive?: boolean;
}

const PageButton: React.FC<PageButtonProps> = ({ children, isActive }) => {
  return (
    <Button
      h="32px"
      minW="32px"
      px="2"
      rounded="sm"
      fontWeight="normal"
      colorScheme={isActive ? "red" : "gray"}
      size="sm"
    >
      {children}
    </Button>
  );
};

const Pagination = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <HStack px="4" py="4">
      {!isMobile && <Text color="gray.500">Menampilkan 3 item dari 70</Text>}
      <Spacer />
      <HStack>
        <PageButton>
          <RiArrowLeftSLine />
        </PageButton>
        {[1, 2, 3].map((item) => (
          <PageButton isActive={item === 1} key={item}>
            {item}
          </PageButton>
        ))}
        <PageButton>
          <RiArrowRightSLine />
        </PageButton>
      </HStack>
    </HStack>
  );
};

export default Pagination;
