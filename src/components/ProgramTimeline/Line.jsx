import React from "react";

export const Line = ({ posX, startY, endY }) => {
  return (
    <line
      stroke="#000"
      strokeWidth={1}
      x1={`${posX}`}
      y1={`${startY}`}
      x2={`${posX}`}
      y2={`${endY}`}
    ></line>
  );
};
