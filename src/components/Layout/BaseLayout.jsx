import React from "react";

import { Typography } from "@mui/material";
import { Header } from "../MainMenu/MainMenu";
import { Container } from "@mui/material";

export const BaseLayout = ({ title, displayPageTitle = true, children }) => (
  <>
    <Header />
    <Container sx={{ textAlign: "center", py: 6 }}>
      {displayPageTitle && (
        <Typography variant="h1" sx={{ mb: 6 }}>
          {title}
        </Typography>
      )}
      {children}
    </Container>
  </>
);
