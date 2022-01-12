import React, { useState } from "react";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
  TextField,
  ListItemIcon,
} from "@mui/material";

const SuggestionsList = ({ suggestions, handleRemove, icon }) => {
  return (
    <List>
      {suggestions?.map((suggestion, index) => (
        <ListItem
          key={index}
          secondaryAction={
            <IconButton
              onClick={() => handleRemove(suggestion)}
              edge="end"
              aria-label="delete"
            >
              <DeleteOutlinedIcon />
            </IconButton>
          }
        >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText primary={suggestion} />
        </ListItem>
      ))}
    </List>
  );
};

export const SuggestionField = ({
  onRemove,
  name,
  suggestions,
  label = "Suggestion",
  icon,
  handleAdd,
  handleRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    const trimmedInputValue = e.target.value.trim();

    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      console.log("adding", trimmedInputValue);
      handleAdd(name, trimmedInputValue);
      setInputValue("");
    }
  };

  return (
    <>
      <TextField
        label={label}
        name="musicSuggestionInput"
        onKeyDown={handleKeyPress}
        value={inputValue}
        onChange={handleChange}
        fullWidth
        variant="standard"
      />
      <SuggestionsList
        suggestions={suggestions}
        icon={icon}
        handleRemove={(value) => handleRemove(name, value)}
      />
    </>
  );
};
