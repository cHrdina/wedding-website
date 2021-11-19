import React, { useState, createContext } from "react";
import { useHistory } from "react-router-dom";

import { getEntryById, getUsersByFieldValue } from "../client/client";

export const AuthContext = createContext({
  userId: undefined,
  user: undefined,
  loginUser: undefined,
  loginUserWithId: undefined,
});

export const AuthHandler = ({ children }) => {
  const [user, setUser] = useState();

  const history = useHistory();

  const loginUserWithId = async (userId, password) => {
    console.log("loginUserWithId called");
    console.log(userId);
    console.log(password);
    const userEntry = await getEntryById(userId);
    console.log(userEntry);
    if (userEntry?.fields.password === password) {
      console.log("passwords match, setting user");
      setUser(userEntry);
      history.push("/");
    }
  };

  const loginUser = async (username, password) => {
    console.log("loginUser called");
    const users = await getUsersByFieldValue({
      fieldName: "username",
      value: username,
    });
    const userToCheck = users?.[0];

    console.log(userToCheck);

    if (userToCheck.fields.password === password) {
      console.log("password matches records");
      setUser(userToCheck);
      history.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, loginUserWithId }}>
      {children}
    </AuthContext.Provider>
  );
};
