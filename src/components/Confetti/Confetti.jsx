import { Box } from "@mui/material";
import React, { useRef, forwardRef } from "react";

import Reward from "react-rewards";

const confettiColors = ["#ee6352", "#59cd90", "#2C3EC1", "#fac05e", "#f79d84"];

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

export const Confetti = forwardRef(({ children }, ref) => (
  <Box width="100%">
    <Reward type="confetti" ref={ref} config={config}>
      {children}
    </Reward>
  </Box>
));
