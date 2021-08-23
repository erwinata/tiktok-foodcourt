import { AspectRatio, Box, Image } from "@chakra-ui/react";
import { HTMLChakraProps } from "@chakra-ui/system";
import { takeFirstLetterEachWord } from "helpers/string";
import React from "react";

interface Props extends HTMLChakraProps<"div"> {
  src: string;
  alt: string;
  minifyText?: boolean;
  ratioo?: number;
}

const Pic: React.FC<Props> = (props) => {
  const { src, ratioo, alt, minifyText, ...restProps } = props;

  let text = minifyText ? takeFirstLetterEachWord(alt) : alt;

  return (
    <AspectRatio overflow="hidden" {...restProps}>
      {src ? (
        <Image
          borderRadius="md"
          objectFit="cover"
          w="full"
          src={src}
          alt={alt}
        />
      ) : (
        <Box
          bg="gray.200"
          fontSize={minifyText ? "md" : "2xl"}
          textAlign="center"
          color="gray.400"
          cursor="default"
        >
          <Box px="8">{text}</Box>
        </Box>
      )}
    </AspectRatio>
  );
};

export default Pic;
