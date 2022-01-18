import React from "react";

import { InviteText } from "./InviteText";
import texturedBackground from "../../assets/Textured.png";
import texturedBackgroundNoShadow from "../../assets/TexturedNoShadow.png";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";

export const InviteCard = () => {
  const backgroundOffset = { x: 70, y: -10 };
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 10,
      }}
    >
      <Paper elevation={14}>
        <Stack
          spacing={12}
          px={4}
          py={16}
          sx={{
            background: `url(${texturedBackground})`,
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgba(255,255,255, 0.4)",
          }}
        >
          <Typography>Together with their families</Typography>
          <Box>
            <Typography variant="h1">Michelle Tandjung</Typography>
            <Typography variant="h1">+</Typography>
            <Typography variant="h1">Christian Hrdina</Typography>
          </Box>
          <Stack spacing={4}>
            <Stack spacing={1}>
              <Typography>request your company at their wedding</Typography>
              <Typography>on Saturday, 5 March 2022</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography>at 4 o’clock in the afternoon,</Typography>
              <Typography>5 Waratah Rd, Palm Beach, NSW</Typography>
            </Stack>

            <Typography>reception to follow</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};
// export const InviteCard = () => {
//   const backgroundOffset = { x: 70, y: -10 };
//   return (
//     <Box position="relative" mt={10}>
//       {/* <Box
//         position="absolute"
//         top={backgroundOffset.y}
//         left={`calc(50% + ${backgroundOffset.x}px)`}
//         width="790px"
//         height="890px"
//         boxShadow={15}
//         sx={{
//           backgroundColor: "#262626",
//           transformOrigin: "bottom right",
//           transform: "rotate(2deg) translateX(-50%) ",
//         }}
//       ></Box> */}
//       <Box
//         position="absolute"
//         top={0}
//         left="50%"
//         width="801px"
//         height="899px"
//         boxShadow={20}
//         sx={{
//           backgroundImage: `url(${texturedBackgroundNoShadow})`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//           transform: "translateX(-50%)",
//         }}
//       >
//         <Box pt={10}>
//           <InviteText />
//         </Box>
//       </Box>
//     </Box>
//   );
// };
