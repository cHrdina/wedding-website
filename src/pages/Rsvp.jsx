import React, { useContext, useEffect, useMemo, useState } from "react";

import { Container } from "@mui/material";
import { getEntryById } from "../client/client";
import { RsvpForm } from "../components/Rsvp/RsvpForm";
import { AuthContext } from "../handlers/AuthHandler";

const Rsvp = () => {
  const { user } = useContext(AuthContext);
  const [householdUsers, setHouseholdUsers] = useState();

  const getHouseholdUsers = async (user) => {
    const household = user.fields.household;
    if (household) {
      const hUsers = await Promise.all(
        household.fields.users.map(async (hhUser) => {
          const hhUserId = hhUser.sys.id;
          if (hhUserId === user.sys.id) {
            return hhUser;
          }
          const userEntry = await getEntryById(hhUserId);
          return userEntry;
        })
      );
      setHouseholdUsers(hUsers);
      return hUsers;
    }
    return null;
  };

  const hasHousehold = useMemo(() => {
    return !!user?.fields.household;
  }, [user]);

  useEffect(() => {
    if (hasHousehold && user) getHouseholdUsers(user);
  }, [hasHousehold, user]);

  if (!user) return <div>Loading user info</div>;

  if (hasHousehold && !householdUsers?.length) {
    return <div>Loading household info</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "left" }}>
      {(householdUsers || user) && (
        <RsvpForm users={householdUsers || [user]} />
      )}
    </Container>
  );
};

export default Rsvp;
