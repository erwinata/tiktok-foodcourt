import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import Form from "components/Form";
import useUserContext from "context/useUserContext";
import { isPWA } from "helpers/pwa";
import { isLocalEnv } from "helpers/env";
import React, { useEffect as useSimpleEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

const InstallPage = () => {
  const history = useHistory();

  const deferredPrompt = useRef<any>();

  window.addEventListener("beforeinstallprompt", (e: any) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt.current = e;
  });

  const installPWA = async () => {
    // Show the install prompt
    deferredPrompt.current && deferredPrompt.current.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.current.userChoice;
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt.current = null;
  };

  useSimpleEffect(() => {
    // const checkPWA = () => {
    //   if (isPWA() || isLocalEnv()) {
    //     history.replace("/login");
    //   }
    // };
    // checkPWA();
    // const interval = setInterval(() => {
    //   checkPWA();
    // }, 3000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  return (
    <Center bg="gray.200" h="100vh">
      <Box px="8" py="12" bg="white" rounded="lg" w="90%" maxW="450px">
        <Heading mb="2">Warung Tiktok</Heading>
        <Text mb="8" fontSize="sm">
          Install terlebih dahulu Tiktok Foodcourt ke perangkat Anda.
        </Text>

        <Button onClick={installPWA} colorScheme="red">
          Install App
        </Button>
      </Box>
    </Center>
  );
};

export default InstallPage;
