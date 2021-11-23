import React, { useContext } from "react";

import Box from "@mui/material/Box";
import { useParams } from "react-router";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { AuthContext } from "../handlers/AuthHandler";

export const Login = () => {
  const { id: paramsUserId } = useParams();
  const { loginUser, loginUserWithId } = useContext(AuthContext);

  const handleLogin = async ({ username, password }) => {
    if (paramsUserId) {
      await loginUserWithId(paramsUserId, password);
    } else {
      await loginUser(username, password);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flex: 1,
        alignItems: "center",
        fontSize: "30px",
      }}
    >
      <LoginForm onSubmit={handleLogin} withUsername={!paramsUserId} />
    </Box>
  );
};

export default Login;