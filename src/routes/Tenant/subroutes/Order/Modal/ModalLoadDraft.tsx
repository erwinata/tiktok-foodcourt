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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Divider,
  Badge,
  InputRightElement,
  Spinner,
  useToast,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import CircleIcon from "components/CircleIcon";
import useModalContext from "context/useModalContext";
import { apiGet } from "helpers/api";
import { formatRp } from "helpers/numberFormatter";
import useSimpleEffect from "hooks/useSimpleEffect";
import React, { useState } from "react";
import {
  RiAddFill,
  RiNotification3Fill,
  RiSearchLine,
  RiLayoutGridFill,
  RiLayoutLine,
  RiArrowRightFill,
  RiArrowRightLine,
  RiFolder2Line,
  RiFolderLine,
  RiFolder3Line,
  RiFolder4Line,
  RiFolder5Line,
  RiDraftLine,
  RiAddLine,
  RiUser3Line,
  RiUser3Fill,
} from "react-icons/ri";
import { sampleOrder } from "routes/Tenant/constants/samples";
import { API_GET_ALL_ORDER_BY_TENANT } from "constants/api";
import useUserContext from "context/useUserContext";
import { IOrder } from "types/interfaces/IOrder";
import { IOrderItem } from "types/interfaces/IOrderItem";
import { convertOrderItemToFE, convertOrderToFE } from "helpers/convertToFE";
import useCartContext from "routes/Tenant/context/useCartContext";

interface Props {}

const ModalLoadDraft = () => {
  const { modalState, modalAct } = useModalContext();
  const { userState, userAct } = useUserContext();
  const { cartState, cartAct } = useCartContext();
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const fetchOrder = async () => {
    setIsLoading(true);

    const resApi = await apiGet(API_GET_ALL_ORDER_BY_TENANT, {
      userId: userState.user?.id,
      isPending: 1,
      isToday: 1,
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

  const onClose = () => {
    modalAct.closeModal();
  };

  const loadOrder = (orderToLoad: IOrder) => {
    cartAct.updateState({ order: orderToLoad });
    toast({
      position: "top",
      description: "Order berhasil dibuka",
      duration: 1500,
    });
    onClose();
  };

  return (
    <Portal>
      <Modal onClose={onClose} size="2xl" isOpen isCentered>
        <ModalOverlay />
        <ModalContent mx="4" w="900px">
          <ModalHeader>Order Aktif</ModalHeader>
          <ModalCloseButton />
          <ModalBody px="0" py="0">
            {isLoading ? (
              <Center py="10">
                <Spinner size="xl" />
              </Center>
            ) : (
              <>
                <Alert status="warning" mb="4">
                  <AlertIcon />
                  <AlertDescription>
                    Order saat ini akan ditimpa jika membuka order lainnya
                  </AlertDescription>
                </Alert>
                <Box px="4" mb="4">
                  <InputGroup rounded="lg">
                    <Input
                      placeholder="Nomor Kartu / Nomor Order"
                      onChange={(e) => {
                        // productAct.searchProducts(e.target.value);
                      }}
                    />
                    <InputRightElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<RiSearchLine size={24} />}
                    />
                  </InputGroup>
                </Box>
                <Stack
                  divider={<Divider />}
                  maxH="60vh"
                  overflowY="scroll"
                  spacing="0"
                >
                  {orderList.map((item, index) => (
                    <Box
                      py="3"
                      px="6"
                      pr="4"
                      textAlign="left"
                      _hover={{ bg: "gray.100" }}
                      key={item.number}
                      onClick={() => loadOrder(item)}
                    >
                      <HStack justify="space-between">
                        <Text
                          fontSize={{ base: "md", md: "lg" }}
                          fontWeight="semibold"
                          mb="1"
                        >
                          {item.number}
                        </Text>
                        <Text color="gray.500" fontSize="sm">
                          3m
                        </Text>
                      </HStack>
                      <HStack flex="1">
                        <Box>
                          <HStack mb="1">
                            <CircleIcon
                              size="24px"
                              color="white"
                              bg="gray.300"
                              icon={<RiUser3Fill />}
                            />
                            <Text fontSize={{ base: "sm", md: "md" }}>
                              {item.customer?.name}
                            </Text>
                          </HStack>
                          <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color="gray.600"
                          >
                            {formatRp(item.total)}
                          </Text>
                        </Box>
                        <Spacer />
                        <Stack align="flex-end" spacing="1">
                          <Text>{item.items.length} item</Text>
                        </Stack>
                      </HStack>
                    </Box>
                  ))}
                </Stack>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Kembali</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Portal>
  );
};

export default ModalLoadDraft;
