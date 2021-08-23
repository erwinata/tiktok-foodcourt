import { useBreakpointValue } from "@chakra-ui/react";
import BottomNavbar from "components/Navbar/BottomNavbar";
import SideNavbar from "components/Navbar/SideNavbar";
import React from "react";
import { INavItem } from "types/interfaces/INavItem";

interface Props {
  pagePathname: string;
  navItems: INavItem[];
  type: "SIDE" | "BOTTOM";
}

const NavbarSection = ({ type, navItems, pagePathname }: Props) => {
  const isBottomNav = useBreakpointValue({ base: true, md: false });

  if (isBottomNav)
    return <BottomNavbar pagePathname={pagePathname} navItems={navItems} />;

  return <SideNavbar pagePathname={pagePathname} navItems={navItems} />;
};

export default NavbarSection;
