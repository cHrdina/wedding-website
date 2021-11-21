import { List, ListItem } from "@material-ui/core";
import React, { useContext, useMemo, useState, useEffect } from "react";
import { getEntryById } from "../client/client";
import { AuthContext } from "../handlers/AuthHandler";

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
    <>
      <h1>Rsvp</h1>
      <h2>Name: {user.fields.firstName}</h2>
      <h2>Household users</h2>
      <List>
        {
          // console.log("hUsers", hUsers)
          householdUsers?.map((hUser, key) => (
            <ListItem key={key}>{hUser.fields.firstName}</ListItem>
          ))
        }
      </List>

      <h3>Allergies</h3>
      <List>
        {user.fields.allergies?.map((allergy) => (
          <ListItem>{allergy}</ListItem>
        ))}
      </List>
    </>
  );
};

export default Rsvp;
