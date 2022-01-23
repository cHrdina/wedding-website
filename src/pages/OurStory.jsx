import React from "react";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getMemories } from "../client/client";
import {
  StoryTimeline,
  StoryTimelineMobile,
} from "../components/StoryTimeline/StoryTimeline";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useMediaQuery } from "@mui/material";

const OurStory = () => {
  const [memories, setMemories] = useState();
  const mobile = !useMediaQuery("(min-width:720px)");

  const getAllMemories = async () => {
    const response = await getMemories();

    setMemories(
      response?.map(({ fields }) => {
        return {
          ...fields,
          image: fields.image[0].fields.file.url,
          story: documentToReactComponents(fields.story),
        };
      })
    );
  };

  useEffect(() => {
    getAllMemories();
  }, []);

  if (!memories) return <>Loading...</>;

  return (
    <Box>
      {mobile ? (
        <StoryTimelineMobile memories={memories} />
      ) : (
        <StoryTimeline memories={memories} />
      )}
    </Box>
  );
};

export default OurStory;
