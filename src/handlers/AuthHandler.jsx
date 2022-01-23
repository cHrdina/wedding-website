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
    localStorage.setItem("userId", userId);
    const u = await getEntryById(userId);
    setUser(u);
  };

  const loginUserWithId = async (userId, password) => {
    const userEntry = await getEntryById(userId);
    if (userEntry?.fields.password === password) {
      setUserInLocal(userEntry.sys.id);
      history.push("/");
    } else {
      throw new Error("Incorrect password");
    }
  };

  const loginUser = async (username, password) => {
    const users = await getUsersByFieldValue({
      fieldName: "username",
      value: username,
    });
    const userEntry = users?.[0];

    if (userEntry?.fields.password === password) {
      setUserInLocal(userEntry.sys.id);
      history.push("/");
    } else {
      throw new Error("Incorrect password");
    }
  };

  const updateUser = async (userId, updates) => {
    await new Promise((resolve) => updateEntry(userId, updates).then(resolve));
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, loginUserWithId, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
