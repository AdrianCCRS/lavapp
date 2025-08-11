import React from "react";
import {
  Navbar as HNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Divider } from "@heroui/divider";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { logout } from "../features/auth/services/auth.service";
import { LogoutIcon, LavAppLogo } from "../styles/Icons";

type NavbarProps = {
  username?: string;
};

type MenuItem = {
  name: string;
  path: string;
  isLogout?: boolean;
};

export default function Navbar({ username }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { name: "Inicio", path: "/" },
    { name: "Mis Reservas", path: "/reservations" },
    { name: "Lavadas Actuales", path: "/current-wash" },
    { name: "Cerrar Sesión", path: "/login", isLogout: true },
  ];

  const isCurrentPage = (path: string): boolean => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const renderNavItem = (item: MenuItem) => (
    <NavbarItem key={item.path} isActive={isCurrentPage(item.path)}>
      <Link
        as={RouterLink}
        to={item.path}
        color={isCurrentPage(item.path) ? "primary" : "foreground"}
        aria-current={isCurrentPage(item.path) ? "page" : undefined}
        className="font-medium"
      >
        {item.name}
      </Link>
    </NavbarItem>
  );

  const renderMobileMenuItem = (item: MenuItem, index: number) => (
    <NavbarMenuItem key={`${item.name}-${index}`}>
      {item.isLogout ? (
        <Link
          className="w-full flex items-center gap-2"
          color="danger"
          href="#"
          size="lg"
          onPress={logout}
        >
          <LogoutIcon size={24} />
          {item.name}
        </Link>
      ) : (
        <Link
          as={RouterLink}
          to={item.path}
          className="w-full flex items-center gap-2"
          color={isCurrentPage(item.path) ? "primary" : "foreground"}
          size="lg"
          onPress={handleMenuItemClick}
          aria-current={isCurrentPage(item.path) ? "page" : undefined}
        >
          {item.name}
        </Link>
      )}
    </NavbarMenuItem>
  );

  return (
    <HNavbar 
      maxWidth="full" 
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      isBlurred
      shouldHideOnScroll
      className="font-sans"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <LavAppLogo size={64} />
          <RouterLink 
            to="/" 
            className="ms-3 font-bold text-inherit hover:text-primary transition-colors"
          >
          Hola, {username}
          </RouterLink>
        </NavbarBrand>
      </NavbarContent>

      <div className=" flex items-center justify-between gap-4 ">
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.filter(item => !item.isLogout).map(renderNavItem)}
        </NavbarContent>
        <Divider orientation="vertical" className="h-6" />
        <NavbarContent className="hidden sm:flex" justify="end">
          <NavbarItem>
            <Button
              variant="light"
              color="danger"
              onPress={logout}
              startContent={<LogoutIcon size={18} />}
              className="font-medium"
            >
              Salir
            </Button>
          </NavbarItem>
        </NavbarContent>
      </div>

      <NavbarMenu>
        {menuItems.map(renderMobileMenuItem)}
      </NavbarMenu>
    </HNavbar>
  );
}

