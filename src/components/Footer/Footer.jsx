import React from "react";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 3,
        px: 4,
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="body1"
        sx={{ fontSize: "1rem", fontWeight: "normal" }}
      >
        made with ♥ &nbsp; by christian + michelle
      </Typography>
    </Box>
  );
};
