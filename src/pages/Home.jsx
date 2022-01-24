import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

import { InviteCard } from "../components/InviteCard/InviteCard";

const Home = () => {
  const { push } = useHistory();

  return (
    <Stack spacing={8} sx={{ margin: "auto" }}>
      <InviteCard />
      <div>
        <Button
          onClick={async () => {
            await push("/rsvp");
          }}
          size="large"
          variant="outlined"
        >
          RSVP
        </Button>
      </div>
    </Stack>
  );
};

export default Home;
