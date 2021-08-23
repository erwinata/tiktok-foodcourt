import { Box, Stack } from "@chakra-ui/react";
import NavItem from "components/Navbar/NavItem";
import React from "react";
import { RiFileTextLine, RiHistoryLine, RiSettings3Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { INavItem } from "types/interfaces/INavItem";

interface Props {
  pagePathname: string;
  navItems: INavItem[];
}

const SideNavbar: React.FC<Props> = ({ navItems, pagePathname }) => {
  const location = useLocation();
  const subpagePathname =
    location.pathname.toLowerCase().match(/[^/]*$/)?.[0] ?? "";
  const fullPathname = location.pathname;

  return (
    <Box
      py="4"
      px="2"
      w="64px"
      bg="white"
      flexShrink={0}
      zIndex="100"
      shadow="xl"
      borderRight="1px"
      borderColor="gray.100"
      pos="sticky"
      top="0"
      h="100vh"
    >
      <Stack spacing="6">
        <img
          alt="logo"
          src="https://pbs.twimg.com/profile_images/510002216770363392/nfAaFu8w_400x400.png"
        />
        {navItems.map((item) => {
          console.log(
            item.pathname,
            fullPathname,
            subpagePathname,
            pagePathname
          );
          return (
            <NavItem
              navItem={item}
              isActive={
                (fullPathname.includes(item.pathname) &&
                  item.pathname !== "") ||
                (item.isMain && subpagePathname === "")
              }
              pagePathname={pagePathname}
              variant="SIDE"
              key={item.title}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default SideNavbar;
