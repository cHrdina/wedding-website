import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useMemo, useState, useEffect } from "react";
import { getEntryById } from "../client/client";
import { AuthContext } from "../handlers/AuthHandler";
import { RsvpForm } from "../components/Rsvp/RsvpForm";

const Rsvp = () => {
  const { user } = useContext(AuthContext);
  const [householdUsers, setHouseholdUsers] = useState();

  const getHouseholdUsers = async (user) => {
    const household = user.fields.household;
    if (household) {
      console.log("household users: ", household.fields.users);
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
    console.log(householdUsers);
    return <div>Loading household info</div>;
  }

  return (
    <Box pt={5}>
      <Typography variant="h1">R S V P</Typography>

      {(householdUsers || user) && (
        <RsvpForm users={householdUsers || [user]} />
      )}
    </Box>
  );
};

export default Rsvp;
