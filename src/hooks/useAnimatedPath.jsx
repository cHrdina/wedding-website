import React, { useState } from "react";
import { useSpring, useSprings } from "react-spring";

export const useAnimatedPath = ({ toggle, delay, ref }) => {
  const [length, setLength] = useState(null);

  const animatedStyle = useSpring({
    strokeDasharray: length,
    strokeDashoffset: toggle ? 0 : length,
    delay,
    config: { duration: 3000 },
  });

  return {
    style: animatedStyle,
    ref: (ref) => {
      if (ref) {
        setLength(ref.getTotalLength());
      }
    },
  };
};

export const useAnimation = ({ ref }) => {
  const spring = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    ref,
  });

  return spring;
};
