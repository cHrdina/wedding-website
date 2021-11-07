import React, { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import { Input, InputLabel } from "@mui/material";
import { getEntryById } from "../client/client";
import { useParams } from "react-router";
import { Button } from "@material-ui/core";

const Login = (props) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const { id: userId } = useParams();

  const getUserInfo = async () => {
    const entry = await getEntryById(userId);
    console.log(entry.fields);
    setUser(entry.fields);
  };

  const attemptLogin = ({ userPass }) => {
    console.log("form submit");
    setIsLoggedIn(userPass === user.password);
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  if (!user) return null;

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
      {isLoggedIn && <h1 sx={{ color: "inherit" }}>Logged In</h1>}
      <form onSubmit={attemptLogin}>
        <InputLabel sx={{ color: "inherit" }}>
          User is {user.firstName}: Password is {user.password}:
        </InputLabel>
        <Input className="password-input" name="userPass" type="password" />
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default Login;
