import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useMemo, useState, useEffect } from "react";
import { getEntryById } from "../client/client";
import { RsvpToggleButton } from "../components/Rsvp/RsvpToggleButton";
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
      console.log(hUsers);
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
    <Box pt={10}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Stack spacing={2}>
            <Typography variant="h3">Rsvp</Typography>
            <Typography variant="body1">Saturday, 5 March 2022</Typography>
          </Stack>
        </Grid>
        <Grid item xs>
          {<RsvpForm users={householdUsers || [user]} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Rsvp;
