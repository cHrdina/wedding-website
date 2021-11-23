import { Button, Divider, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import { RsvpToggleButton } from "./RsvpToggleButton";
import { Box } from "@mui/system";

export const RsvpForm = ({ users }) => {
  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Typography variant="h5">
          Will you be able to attend our wedding in Palm Beach, Australia?
        </Typography>
        <Typography variant="subtitle2">
          Please respond by 31 Feb 2022
        </Typography>
      </Stack>
      <Stack spacing={4} divider={<Divider />}>
        {users?.map((user, key) => (
          <Stack spacing={2}>
            <Typography mb={2} variant="h6">
              <i>{user.fields.firstName}</i>
            </Typography>
            <RsvpToggleButton user={user} />
          </Stack>
        ))}
      </Stack>
      <Box width="100%" alignContent="center">
        <LoadingButton
          fullWidth={false}
          variant="contained"
          size="large"
          startIcon={<SendIcon />}
          type="submit"
        >
          Submit response
        </LoadingButton>
      </Box>
    </Stack>
  );
};
