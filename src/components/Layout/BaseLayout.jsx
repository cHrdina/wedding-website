import React from "react";

import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { Header } from "../MainMenu/MainMenu";
import { Container } from "@mui/material";

export const BaseLayout = ({ title, displayPageTitle = true, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Header />
      <Container sx={{ textAlign: "center", py: isMobile ? 14 : 20 }}>
        {displayPageTitle && (
          <Typography variant="h1" sx={{ mb: 6 }}>
            {title}
          </Typography>
        )}
        {children}
      </Container>
    </>
  );
};
