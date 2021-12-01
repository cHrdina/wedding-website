import React, { useState } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export const RsvpToggleButton = ({ name, value, onChange }) => {
  return (
    <RadioGroup
      id={name}
      aria-label={name}
      name={name}
      onChange={onChange}
      value={value}
    >
      <FormControlLabel
        value="attending"
        control={<Radio />}
        label="Attending"
      />
      <FormControlLabel
        value="not_attending"
        control={<Radio />}
        label="Not Attending"
      />
    </RadioGroup>
  );
};
