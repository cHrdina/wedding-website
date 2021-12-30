import React from "react";
import MuiTimeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Typography } from "@material-ui/core";

export const Timeline = ({ events }) => {
  return (
    <>
      <MuiTimeline>
        {events.map(({ title, time }, index) => (
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography>{time}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot variant="outlined" />
              <TimelineConnector hidden={index === events.length - 1} />
            </TimelineSeparator>
            <TimelineContent>
              <Typography>{title}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </MuiTimeline>
    </>
  );
};

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useSpring, useSpringRef, useChain, animated } from "react-spring";
// import { useAnimatedPath, useAnimation } from "../../hooks/useAnimatedPath";
// import { AnimatedLine } from "./AnimatedLine";
// import { Circle } from "./Circle";
// import { Line } from "./Line";

// export const Timeline = ({ events, interval = 50 }) => {
//   const [toggle, setToggle] = useState(false);
//   const springRefs = useRef([]);

//   // springRefs.current = events.map(
//   //   (ref, index) => (springRefs.current[index] = React.createRef())
//   // );

//   // useChain(springRefs.current);

//   const duration = 1000;

//   const svgWidth = 40;
//   const circleSize = 10;

//   return (
//     <div>
//       <svg
//         width={svgWidth}
//         height={interval * events.length - (circleSize * events.length) / 2 + 2}
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {events.map((_, index) => (
//           <g>
//             <Circle
//               posX={svgWidth / 2}
//               posY={index * interval + circleSize / 2 + 1}
//               size={circleSize}
//             />
//             {index !== events.length - 1 && (
//               <Line
//                 posX={svgWidth / 2}
//                 startY={index * interval + circleSize}
//                 endY={index * interval + interval}
//               />
//             )}
//           </g>
//           // <AnimatedLine
//           //   key={index}
//           //   ref={springRef}
//           //   toggle={toggle}
//           //   yStart={index * interval}
//           //   yEnd={index * interval + interval}
//           //   // delay={duration * index + 1000}
//           // />
//         ))}
//       </svg>
//     </div>
//   );
// };
