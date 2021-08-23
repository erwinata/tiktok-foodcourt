import { Stack } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { INavItem } from "types/interfaces/INavItem";

interface Props {
  navItem: INavItem;
  pagePathname: string;
  isActive?: boolean;
  variant: "BOTTOM" | "SIDE";
}

const NavItem: React.FC<Props> = ({
  navItem,
  pagePathname,
  isActive,
  variant,
}) => {
  const history = useHistory();

  const go = () => {
    history.push(`/${pagePathname}/${navItem.pathname}`);
  };

  return (
    <Stack
      aria-label="Tambah"
      size="lg"
      variant="ghost"
      color={isActive ? "red.400" : "gray.400"}
      py="1"
      w={variant === "BOTTOM" ? "33.3333%" : "full"}
      h={variant === "BOTTOM" ? "full" : "auto"}
      _hover={{ bg: "gray.50" }}
      justify="center"
      align="center"
      spacing="-0.5"
      cursor="default"
      userSelect="none"
      onClick={go}
    >
      {navItem.icon}
      {/* {isActive && variant === "BOTTOM" && <Text fontSize={"sm"}>{title}</Text>} */}
    </Stack>
  );
};

export default NavItem;
