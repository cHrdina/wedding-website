import React, { useState } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const RsvpToggleButton = ({ user }) => {
  const [status, setStatus] = useState(user.fields.rsvpStatus);

  const handleChange = (event, value) => {
    setStatus(value);
  };

  return (
    <ToggleButtonGroup
      value={status}
      exclusive
      onChange={handleChange}
      aria-label="rsvp toggle buttons"
    >
      <ToggleButton
        sx={{
          textTransform: "none",
        }}
        value="not-attending"
        aria-label="not attending"
      >
        No, I can't attend
      </ToggleButton>
      <ToggleButton
        sx={{
          textTransform: "none",
        }}
        value="attending"
        aria-label="attending"
      >
        Yes, I'll be there
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
