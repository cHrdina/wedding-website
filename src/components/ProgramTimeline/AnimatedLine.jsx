import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

import { useAnimatedPath } from "../../hooks/useAnimatedPath";

export const AnimatedLine = ({ ref, toggle, yStart, yEnd, delay = 0 }) => {
  const animationProps = useAnimatedPath({ toggle, delay, ref });

  return (
    <animated.path
      {...animationProps}
      stroke="#000"
      strokeWidth="1"
      d={`m4 ${yStart} v4 ${yEnd} z`}
    />
  );
};
