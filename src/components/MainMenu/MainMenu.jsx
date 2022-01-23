import React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { mainMenuRoutes } from "../../routes";
import { MobileMenu } from "../MobileMenu/MobileMenu";

export const Header = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="logo"
            noWrap
            component="div"
            sx={{ pr: 2, display: "flex" }}
          >
            m{" + "}c
          </Typography>
          {isMobile ? (
            <MobileMenu />
          ) : (
            <Box>
              <Grid container spacing={4}>
                {mainMenuRoutes
                  .filter((route) => !route.isPublic)
                  .map(({ name, route }, key) => (
                    <Grid item key={key}>
                      <MuiLink
                        sx={{
                          color: "text.primary",
                          textDecoration: "none",
                          fontWeight: pathname === route ? 600 : 400,
                        }}
                        variant="body1"
                        component={Link}
                        to={route}
                      >
                        {name}
                      </MuiLink>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
