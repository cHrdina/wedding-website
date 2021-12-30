import React from "react";

export const Circle = ({ posX, posY, size }) => {
  return (
    <circle
      stroke="#000"
      strokeWidth={1}
      fill="#fff"
      cx={`${posX}`}
      cy={`${posY}`}
      r={`${size / 2}`}
    />
  );
};
