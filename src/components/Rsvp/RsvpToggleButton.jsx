import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";

export const RsvpToggleButton = ({ name, value, onChange }) => {
  return (
    <ToggleButtonGroup
      id={name}
      aria-label={name}
      onChange={(event, val) => onChange(name, val)}
      exclusive
      value={value}
      size="large"
    >
      <ToggleButton value="attending">Yes, I&aposll be there</ToggleButton>
      <ToggleButton value="not_attending">No, I can&apost attend</ToggleButton>
    </ToggleButtonGroup>
  );
};
