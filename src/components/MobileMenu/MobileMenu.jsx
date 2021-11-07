import React, { useState } from "react";

import { styled, useTheme } from "@mui/material/styles";
import {
  Drawer,
  List,
  Link,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { mainMenuRoutes } from "../../routes";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const MobileMenu = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };
  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        anchor="right"
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {mainMenuRoutes
            .filter(({ route }) => route !== "/login")
            .map(({ name, route }, key) => (
              <ListItem>
                <ListItemText>
                  <Link key={key} href={route}>
                    {name}
                  </Link>
                </ListItemText>
              </ListItem>
            ))}
        </List>
      </Drawer>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ ...(isOpen && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};
