import { Box, Center, Spinner, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  isLoading: boolean;
  text?: string;
}

const LoaderOverlay: React.FC<Props> = ({ isLoading, text, children }) => {
  return (
    <Box pos="relative">
      {isLoading && (
        <Stack
          w="full"
          h="full"
          pos="absolute"
          bg="white"
          opacity="0.7"
          zIndex={1000}
          align="center"
          justify="center"
          spacing="4"
        >
          <Spinner size="xl" />
          {text && <Text>{text}</Text>}
        </Stack>
      )}
      {children}
    </Box>
  );
};

export default LoaderOverlay;
