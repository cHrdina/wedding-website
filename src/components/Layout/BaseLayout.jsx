import React from "react";

import { Box } from "@material-ui/core";
import { Header } from "../MainMenu/MainMenu";

export const BaseLayout = ({ title, children }) => (
  <>
    <Header />
    <Box
      textAlign={"center"}
      sx={{
        height: "90vh",
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <h1>{title}</h1>
      {children}
    </Box>
  </>
);
