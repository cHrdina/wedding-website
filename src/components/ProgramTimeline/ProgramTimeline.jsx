import React from "react";
import MuiTimeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Typography } from "@mui/material";

export const ProgramTimeline = ({ events }) => {
  return (
    <>
      <MuiTimeline sx={{ width: "50vw" }}>
        {events.map(({ title, time }, index) => (
          <TimelineItem key={index} sx={{ minHeight: "2.5rem" }}>
            <TimelineOppositeContent sx={{ position: "relative" }}>
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  top: "-0.2rem",
                  right: 0,
                  lineHeight: "1",
                }}
              >
                {time}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                variant="outlined"
                sx={{
                  my: 0,
                  mx: 4,
                  p: "4px",
                  borderWidth: 1,
                  borderColor: "default.color",
                }}
              />
              <TimelineConnector
                hidden={index === events.length - 1}
                sx={{
                  width: "1px",
                  backgroundColor: "default.color",
                }}
              />
            </TimelineSeparator>
            <TimelineContent sx={{ position: "relative" }}>
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  top: "-0.2rem",
                  left: 0,
                  lineHeight: "1",
                }}
              >
                {title}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </MuiTimeline>
    </>
  );
};
