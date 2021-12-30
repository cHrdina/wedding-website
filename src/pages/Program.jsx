import React, { useState } from "react";

import { Box, Typography } from "@material-ui/core";
import { Timeline } from "../components/Timeline/Timeline";

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
    <>
      <Typography variant="h1">Sat, 5 March '22</Typography>
      <Box
        sx={{
          justifyContent: "center",
        }}
      >
        <Timeline events={events} />
      </Box>
    </>
  );
};

export default Program;
