import { Circle, HTMLChakraProps } from "@chakra-ui/react";
import React from "react";
import { RiUser3Fill } from "react-icons/ri";

interface Props extends HTMLChakraProps<"div"> {
  icon: React.ReactNode;
  size?: string | number;
}

const CircleIcon: React.FC<Props> = (props) => {
  const size = props.size ?? "28px";

  return (
    <Circle {...props} size={size}>
      {props.icon}
    </Circle>
  );
};

export default CircleIcon;
