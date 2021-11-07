import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { Input, InputLabel } from "@mui/material";
import { client, getAll } from "../client/client";

const Login = (props) => {
  const [users, setUsers] = useState();

  const getAllUsers = async () => {
    const response = await getAll("user");
    setUsers(response?.items);

    return response;
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flex: 1,
        alignItems: "center",
        color: "#fff",
        backgroundColor: "#000",
        fontSize: "30px",
      }}
    >
      <InputLabel>Password:</InputLabel>
      <Input className="password-input" />
    </Box>
  );
};

export default Login;
