import React, { useState, createContext, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

import {
  getEntryById,
  getUsersByFieldValue,
  updateEntry,
} from "../client/client";

export const AuthContext = createContext({
  userId: undefined,
  user: undefined,
  loginUser: undefined,
  loginUserWithId: undefined,
  updateUser: undefined,
});

export const AuthHandler = ({ children }) => {
  const [user, setUser] = useState();

  const history = useHistory();

  const storedUserId = useMemo(() => localStorage.getItem("userId"), []);

  const setUserFromLocal = async () => {
    const storedUser = await getEntryById(storedUserId);
    setUser(storedUser);
  };

  useEffect(() => {
    if (storedUserId) setUserFromLocal();
  }, [storedUserId]);

  const setUserInLocal = async (userId) => {
    console.log("setting user in local: ", userId);
    localStorage.setItem("userId", userId);
    const u = await getEntryById(userId);
    setUser(u);
  };

  const loginUserWithId = async (userId, password) => {
    console.log("loginUserWithId called");
    console.log(userId);
    console.log(password);
    const userEntry = await getEntryById(userId);
    console.log(userEntry);
    if (userEntry?.fields.password === password) {
      console.log("passwords match, setting user");
      setUserInLocal(userEntry.sys.id);
      history.push("/");
    }
  };

  const loginUser = async (username, password) => {
    console.log("loginUser called");
    const users = await getUsersByFieldValue({
      fieldName: "username",
      value: username,
    });
    const userEntry = users?.[0];

    console.log(userEntry);

    if (userEntry?.fields.password === password) {
      console.log("password matches records");
      setUserInLocal(userEntry.sys.id);
      history.push("/");
    }
  };

  const updateUser = async (userId, updates) => {
    const result = await new Promise((resolve) =>
      updateEntry(userId, updates).then(resolve)
    );
    console.log("update result", result);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, loginUserWithId, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
