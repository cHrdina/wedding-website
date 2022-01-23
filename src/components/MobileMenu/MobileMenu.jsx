import React from "react";
import { useToggle } from "../../hooks/useToggle";

import { mainMenuRoutes } from "../../routes";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import { Drawer, IconButton, Box, Link } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ListItemText, MenuItem, MenuList } from "@mui/material";

export const MobileMenu = () => {
  const [isOpen, toggleIsOpen] = useToggle();

  const isActiveRoute = (route) => {
    return window.location.pathname === route;
  };

  return (
    <>
      <Drawer open={isOpen} anchor="top" variant="temporary">
        <Box p={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={toggleIsOpen}>
            <ExpandLessIcon />
          </IconButton>
        </Box>
        <Box sx={{ width: "100vw", maxWidth: "100%" }}>
          <MenuList>
            {mainMenuRoutes
              .filter((route) => !route.isPublic)
              .map(({ name, route }, index) => (
                <Link
                  key={index}
                  href={route}
                  variant="body1"
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem
                    selected={isActiveRoute(route)}
                    sx={{ textAlign: "center", py: 4 }}
                  >
                    <ListItemText primary={name} />
                  </MenuItem>
                </Link>
              ))}
          </MenuList>
        </Box>
      </Drawer>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleIsOpen}
        edge="start"
        sx={{ ...(isOpen && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};
