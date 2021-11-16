import React, { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { getEntryById } from "../client/client";

const Rsvp = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div>Loading user info</div>;

  return (
    <>
      <h1>Rsvp</h1>
      <h2>{user.firstName}</h2>
    </>
  );
};

export default Rsvp;
