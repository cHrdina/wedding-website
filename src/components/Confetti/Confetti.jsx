import React, { forwardRef } from "react";

import Reward from "react-rewards";

const confettiColors = [
  "#ee6352",
  "#94dfb7",
  "#ffefe6",
  "#fac05e",
  "#f79d84",
  "#B76E79",
];

const defaultConfig = {
  lifetime: 82,
  angle: 90,
  decay: 0.94,
  spread: 295,
  startVelocity: 28,
  elementCount: 300,
  elementSize: 7,
  colors: confettiColors,
};

export const Confetti = forwardRef(
  ({ children, type = "confetti", config = defaultConfig }, ref) => (
    <div sx={{ textAlign: "center", height: "10px" }}>
      <Reward type={type} ref={ref} config={config}>
        <div>{children}</div>
      </Reward>
    </div>
  )
);
