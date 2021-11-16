import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { getEntryById } from "../client/client";
import { useParams, useHistory } from "react-router";
import { LoginForm } from "../components/LoginForm/LoginForm";

export const Login = ({ setLoggedInUser }) => {
  const [user, setUser] = useState();
  const { id: userId } = useParams();
  const history = useHistory();

  const getUserInfo = async () => {
    const entry = await getEntryById(userId);
    console.log(entry.fields);
    setUser(entry.fields);
  };

  const attemptLogin = (password) => {
    console.log("form submit");
    console.log("password: ", password);

    if (password === user.password) {
      console.log("password success: ", userId);
      setLoggedInUser(userId);
      history.push("/");
    } else {
      setLoggedInUser(null);
    }
  };

  useEffect(() => {
    console.log("useEffecy triggetres");
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
        // color: "#fff",
        // backgroundColor: "#000",
        fontSize: "30px",
      }}
    >
      <LoginForm onSubmit={attemptLogin} />
    </Box>
  );
  return <div>hello</div>;
};

export default Login;
