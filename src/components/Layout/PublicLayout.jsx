import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Header } from "../MainMenu/MainMenu";

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
          M{" & "}C
        </Typography>
      </Toolbar>
    </AppBar>
    <Container disableGutters sx={{ display: "flex", flex: 1, pb: 20 }}>
      {children}
    </Container>
  </Box>
);
