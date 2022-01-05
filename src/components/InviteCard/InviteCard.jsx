import React from "react";

import { InviteText } from "./InviteText";
import texturedBackground from "../../assets/Textured.png";
import texturedBackgroundNoShadow from "../../assets/TexturedNoShadow.png";
import { Box, Container } from "@mui/material";

export const InviteCard = () => {
  const backgroundOffset = { x: 70, y: -10 };
  return (
    <Box position="relative" mt={10}>
      <Box
        position="absolute"
        top={backgroundOffset.y}
        left={`calc(50% + ${backgroundOffset.x}px)`}
        width="790px"
        height="890px"
        boxShadow={15}
        sx={{
          backgroundColor: "#262626",
          transformOrigin: "bottom right",
          transform: "rotate(2deg) translateX(-50%) ",
        }}
      ></Box>
      <Box
        position="absolute"
        top={0}
        left="50%"
        width="801px"
        height="899px"
        boxShadow={20}
        sx={{
          backgroundImage: `url(${texturedBackgroundNoShadow})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          transform: "translateX(-50%)",
        }}
      >
        <Box pt={10}>
          <InviteText />
        </Box>
      </Box>
    </Box>
  );
};
