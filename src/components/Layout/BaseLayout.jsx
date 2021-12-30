import React from "react";

import { Box } from "@material-ui/core";
import { Header } from "../MainMenu/MainMenu";

export const BaseLayout = ({ title, children }) => (
  <>
    <Header />
    <Box
      textAlign="center"
      display="flex"
      justifyContent="center"
      height="90vh"
      pt={4}
    >
      <Box>{children}</Box>
    </Box>
  </>
);
