import React from "react";
import MuiTimeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Box, Typography } from "@mui/material";
import { format, formatISO } from "date-fns";
import { Stack } from "@mui/material";

const StoryContent = ({ image, title, story, date }) => (
  <Box>
    <img src={image} width="100%" style={{ marginBottom: "1rem" }} />
    <Typography variant="h4">{title}</Typography>
    <Typography variant="subtitle1">
      {format(new Date(date), "MMMM yyyy")}
    </Typography>
    <Typography>{story}</Typography>
  </Box>
);

export const StoryTimeline = ({ memories }) => {
  return (
    <MuiTimeline position="alternate">
      {memories?.map((memory, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot variant="outlined" />
            <TimelineConnector hidden={index === memories.length - 1} />
          </TimelineSeparator>
          <TimelineContent>
            <StoryContent {...memory} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </MuiTimeline>
  );
};

export const StoryTimelineMobile = ({ memories }) => {
  return (
    <Stack spacing={4}>
      {memories?.map((memory) => (
        <StoryContent {...memory} />
      ))}
    </Stack>
  );
};
