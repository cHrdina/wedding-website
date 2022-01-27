import React from "react";

import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { Header } from "../Header/MainMenu";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { Footer } from "../Footer/Footer";

export const BaseLayout = ({ title, displayPageTitle = true, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Header />
      <Container
        sx={{
          textAlign: "center",
          pt: isMobile ? 14 : 20,
          pb: 20,
        }}
      >
        {displayPageTitle && (
          <Typography variant="h1" sx={{ mb: 6 }}>
            {title}
          </Typography>
        )}
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
