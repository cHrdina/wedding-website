import React from "react";

import texturedBackground from "../../assets/Textured.png";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";

export const InviteCard = () => {
  return (
    <Container maxWidth="md">
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
