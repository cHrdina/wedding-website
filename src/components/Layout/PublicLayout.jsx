import React from "react";

import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

export const PublicLayout = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      height: "100vh",
      flexDirection: "column",
    }}
  >
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "background.default", color: "text.primary" }}
    >
      <Toolbar>
        <Typography
          variant="logo"
          noWrap
          component="div"
          sx={{ p: 2, display: "flex" }}
        >
          m{" + "}c
        </Typography>
      </Toolbar>
    </AppBar>
    <Container
      disableGutters
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        flex: 1,
        pb: 20,
        mt: 4,
      }}
    >
      {children}
    </Container>
  </Box>
);
