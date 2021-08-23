import { Box, Button, HStack, Text } from "@chakra-ui/react";
import beepSfx from "assets/beep.mp3";
import useModalContext from "context/useModalContext";
import React from "react";
import { RiAddLine, RiDraftLine } from "react-icons/ri";
import { MODAL_TENANT_ID } from "routes/Tenant/constants/modal";

interface Props {}

const FloaterNewOrder = () => {
  const audioBeep = new Audio(beepSfx);
  const { modalState, modalAct } = useModalContext();

  return (
    <>
      <Box
        shadow="dark-lg"
        rounded="lg"
        pos="fixed"
        zIndex="10"
        px="3"
        py="3"
        bottom={{
          base: "72px",
          md: "8",
        }}
        right={{
          base: "2.5vw",
          md: "12",
        }}
        w="95vw"
        maxW="500px"
        bg="white"
        userSelect="none"
        cursor="pointer"
      >
        <HStack w="full">
          <Button
            flexGrow={1}
            size="lg"
            onClick={() => {
              modalAct.openModal({ id: MODAL_TENANT_ID.LOAD_DRAFT });
            }}
          >
            <HStack>
              <RiDraftLine size={24} />
              <Text as="span" display={{ base: "none", sm: "inline" }}>
                Order Aktif
              </Text>
            </HStack>
          </Button>
          <Button
            flexGrow={1}
            size="lg"
            leftIcon={<RiAddLine size={24} />}
            colorScheme="red"
            onClick={() => {
              // audioBeep.volume = 0;
              // audioBeep.play();
              // audioBeep.pause();
              // audioBeep.volume = 1;
              modalAct.openModal({ id: MODAL_TENANT_ID.INPUT_CUSTOMER });
            }}
          >
            New Order
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default FloaterNewOrder;
