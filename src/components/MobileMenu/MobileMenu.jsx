import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import {
  Drawer,
  List,
  IconButton,
  makeStyles,
  ListItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { mainMenuRoutes } from "../../routes";

// const useStyles = makeStyles((theme) => ({
//   navbar: {
//     whiteSpace: "nowrap",
//     // paddingLeft: theme.spacing(20),
//     // paddingRight: theme.spacing(20),
//     backgroundColor: "white",
//     color: "black",
//     border: "none",
//     boxShadow: "none",
//   },
//   navlinks: {
//     marginLeft: theme.spacing(10),
//     display: "flex",
//   },
//   logo: {
//     flexGrow: "1",
//     cursor: "pointer",
//   },
//   link: {
//     textDecoration: "none",
//     fontSize: "20px",
//     marginLeft: theme.spacing(10),
//     color: "black",
//     "&:hover": {
//       borderBottom: "1px solid black",
//     },
//   },
// }));

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
  // const { pathname } = useLocation();
  // const classes = useStyles();
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
        variant="temporary"
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
            .filter((route) => !route.isPublic)
            .map(({ name, route }, key) => (
              <ListItem>
                <Link key={key} to={route}>
                  {name}
                </Link>
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
