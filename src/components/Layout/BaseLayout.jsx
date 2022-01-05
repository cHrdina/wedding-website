import React from "react";

import { Box, Typography } from "@mui/material";
import { Header } from "../MainMenu/MainMenu";
import { Container } from "@mui/material";

export const BaseLayout = ({ title, children }) => (
  <>
    <Header />
    <Container>
      <Box sx={{ textAlign: "center" }} pt={4}>
        {/* <Typography variant="h1">{title}</Typography> */}
        {children}
      </Box>
    </Container>
  </>
);
