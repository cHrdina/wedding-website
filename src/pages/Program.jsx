import React, { useState } from "react";

import { Box, Typography } from "@mui/material";
import { ProgramTimeline } from "../components/ProgramTimeline/ProgramTimeline";

const events = [
  {
    title: "Guests arrive",
    time: "3:40 pm",
  },
  {
    title: "Wedding ceremony",
    time: "4 pm",
  },
  {
    title: "Photos and drinks",
    time: "4:30 pm",
  },
  {
    title: "Wedding reception",
    time: "6 pm",
  },
  {
    title: "Cake & first dance",
    time: "7:30 pm",
  },
  {
    title: "Pool party",
    time: "11 pm",
  },
];

const Program = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h1">Sat, 5 March</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pr: "5%",
        }}
      >
        <ProgramTimeline events={events} />
      </Box>
    </Box>
  );
};

export default Program;
