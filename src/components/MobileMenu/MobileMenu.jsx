import React, { useState } from "react";

import { styled, useTheme } from "@mui/styles";
import { Drawer, IconButton, Box, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { mainMenuRoutes } from "../../routes";
import { ListItemText, MenuItem, MenuList } from "@mui/material";
import { useToggle } from "../../hooks/useToggle";

export const MobileMenu = () => {
  const theme = useTheme();
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
