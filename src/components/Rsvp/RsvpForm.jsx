import {
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

import React, { useContext, useState } from "react";
import { RsvpToggleButton } from "./RsvpToggleButton";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { AuthContext } from "../../handlers/AuthHandler";
import { updateEntry } from "../../client/client";
import { DietaryRequirementsSection } from "./DietaryRequirements";

export const RsvpForm = ({ users, onSubmit }) => {
  const { updateUser } = useContext(AuthContext);

  const {
    handleSubmit,
    handleChange,
    onChange,
    values,
    initialValues,
    setSubmitting,
    isSubmitting,
  } = useFormik({
    initialValues: users.reduce((o, user) => {
      const userId = user.sys.id;

      const initValues = {
        ...o,
        [userId]: {
          rsvpStatus: user.fields.rsvpStatus,
          dietaryRequirements: user.fields.dietaryRequirements,
        },
      };

      return initValues;
    }, {}),
    onSubmit: async (values) => {
      const updates = Object.entries(values)?.reduce((o, [userId, updates]) => {
        return [
          ...o,
          {
            userId,
            updates,
          },
        ];
      }, []);

      setSubmitting(true);

      const updatedEntries = await Promise.all(
        updates.forEach(async ({ userId, updates }) => {
          return updateUser(userId, updates);
        })
      );

      console.log(values);

      // console.log(updatedEntries);

      setSubmitting(false);
      return updatedEntries;
    },
    onChange: (values) => {},
  });

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Typography variant="h5">
          Will you be able to attend our wedding in Palm Beach, Australia?
        </Typography>
        <Typography variant="subtitle2">
          Please respond by 31 Feb 2022
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit} onChange={onChange}>
        <Stack spacing={4} divider={<Divider />}>
          {users.map((user, key) => (
            <Stack key={key} spacing={2}>
              <Typography mb={2} variant="h6">
                <i>{user.fields.firstName}</i>
              </Typography>
              <RsvpToggleButton
                name={`${user.sys.id}.rsvpStatus`}
                value={values[user.sys.id].rsvpStatus}
                onChange={handleChange}
              />

              {values[user.sys.id].rsvpStatus === "attending" && (
                <DietaryRequirementsSection
                  onChange={handleChange}
                  user={user}
                  values={values[user.sys.id].dietaryRequirements}
                />
              )}
            </Stack>
          ))}
          <Box width="100%" alignContent="center">
            <LoadingButton
              type="submit"
              // fullWidth={false}
              variant="outlined"
              // size="large"
              startIcon={<SendIcon />}
              loading={isSubmitting}
            >
              Submit response
            </LoadingButton>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};
