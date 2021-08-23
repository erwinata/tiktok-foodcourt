import { Flex } from "@chakra-ui/react";
import NavItem from "components/Navbar/NavItem";
import useThemeContext from "context/useThemeContext";
import React from "react";
import { RiFileTextLine, RiHistoryLine, RiSettings3Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { INavItem } from "types/interfaces/INavItem";

interface Props {
  pagePathname: string;
  navItems: INavItem[];
}

const BottomNavbar: React.FC<Props> = ({ pagePathname, navItems }) => {
  const location = useLocation();
  const subpagePathname =
    location.pathname.toLowerCase().match(/[^/]*$/)?.[0] ?? "";

  const { themeHelpers } = useThemeContext();

  if (themeHelpers.isKeyboardOpen) return null;

  return (
    <Flex
      bg="white"
      flexShrink={0}
      zIndex="100"
      shadow="xl"
      w="100vw"
      bottom="0"
      pos="fixed"
      borderTop="1px"
      borderColor="gray.100"
      h="16"
    >
      {navItems.map((item) => (
        <NavItem
          navItem={item}
          isActive={
            item.pathname.includes(subpagePathname) ||
            (item.isMain && subpagePathname === pagePathname)
          }
          pagePathname={pagePathname}
          variant="BOTTOM"
          key={item.title}
        />
      ))}
    </Flex>
  );
};

export default BottomNavbar;
