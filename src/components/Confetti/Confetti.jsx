import { Box } from "@mui/material";
import React, { useRef, forwardRef } from "react";

import Reward from "react-rewards";

const confettiColors = [
  "#ee6352",
  "#94dfb7",
  "#ffefe6",
  "#fac05e",
  "#f79d84",
  "#B76E79",
];

const config = {
  lifetime: 82,
  angle: 90,
  decay: 0.93,
  spread: 87,
  startVelocity: 27,
  elementCount: 90,
  elementSize: 7,
  colors: confettiColors,
};

export const Confetti = forwardRef(({ children, type = "confetti" }, ref) => (
  <Box width="100%">
    <Reward type={type} ref={ref} config={config}>
      {children}
    </Reward>
  </Box>
));
