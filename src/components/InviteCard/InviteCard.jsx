import React from "react";
import { TexturedBackground } from "./Background";
import { InviteText } from "./InviteText";

// import texturedBackground from "../../assets/textured-background.svg";
import texturedBackground from "../../assets/Textured.png";
import texturedBackgroundNoShadow from "../../assets/TexturedNoShadow.png";
import { Box, Container } from "@material-ui/core";

export const InviteCard = () => {
  return (
    <Box position="relative" mt={10}>
      <Box
        position="absolute"
        top={-25}
        left={-320}
        width="790px"
        height="890px"
        boxShadow={15}
        sx={{
          backgroundColor: "#262626",
          transformOrigin: "bottom right",
          transform: "rotate(2deg)",
        }}
      ></Box>
      <Box
        position="absolute"
        top={0}
        left={-400}
        width="801px"
        height="899px"
        boxShadow={20}
        sx={{
          backgroundImage: `url(${texturedBackgroundNoShadow})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Box pt={10}>
          <InviteText />
        </Box>
      </Box>
    </Box>
  );
};
