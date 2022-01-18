import React, { useState } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

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
      <ToggleButton value="attending">Yes, I'll be there</ToggleButton>
      <ToggleButton value="not_attending">No, I can't attend</ToggleButton>
    </ToggleButtonGroup>
  );
};
