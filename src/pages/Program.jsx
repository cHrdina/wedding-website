import React, { useState } from "react";
import { useSpring } from "react-spring";

import { Grid, Divider, Box } from "@material-ui/core";
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

const EventTimeline = ({ events }) => {
  return (
    <div>
      <Timeline events={events} />
    </div>
  );
};

const Program = () => {
  return (
    <>
      <h2>Sat, 5 March '22</h2>
      <Box
        sx={{
          justifyContent: "center",
        }}
      >
        <EventTimeline events={events} />
      </Box>
    </>
  );
};

export default Program;
