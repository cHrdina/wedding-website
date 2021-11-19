import React, { useContext } from "react";
import { AuthContext } from "../handlers/AuthHandler";

const Rsvp = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div>Loading user info</div>;

  return (
    <>
      <h1>Rsvp</h1>
      <h2>{user.fields.firstName}</h2>
    </>
  );
};

export default Rsvp;
