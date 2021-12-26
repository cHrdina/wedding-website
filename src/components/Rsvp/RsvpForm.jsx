import React, { useContext, useEffect, useMemo, useState } from "react";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import { Form, Formik, useFormik } from "formik";

import { RsvpToggleButton } from "./RsvpToggleButton";
import { AuthContext } from "../../handlers/AuthHandler";
import { DietaryRequirementsSection } from "./DietaryRequirements";

export const RsvpForm = ({ users, onSubmit }) => {
  const { updateUser } = useContext(AuthContext);

  const initialValues = useMemo(() => {
    return users.reduce((o, user) => {
      const userId = user.sys.id;

      const initValues = {
        ...o,
        [userId]: {
          rsvpStatus: user.fields.rsvpStatus,
          dietaryRequirements: user.fields.dietaryRequirements,
          allergies: user.fields.allergies,
        },
      };

      return initValues;
    }, {});
  }, [users]);

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
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const updates = Object.entries(values)?.reduce(
            (o, [userId, updates]) => {
              return [
                ...o,
                {
                  userId,
                  updates,
                },
              ];
            },
            []
          );

          const updatedEntries = await Promise.all(
            updates?.map(async ({ userId, updates }) => {
              return updateUser(userId, updates);
            })
          );

          return updatedEntries;
        }}
      >
        {({
          handleSubmit,
          handleChange,
          onChange,
          values,
          dirty,
          isSubmitting,
        }) => (
          <Form>
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
                    <Stack spacing={4}>
                      <DietaryRequirementsSection
                        onChange={handleChange}
                        user={user}
                        values={values[user.sys.id].dietaryRequirements}
                      />
                      <TextField
                        name={`${user.sys.id}.allergies`}
                        label="Allergies"
                        placeholder="Please list any allergies here."
                        multiline
                        value={values[user.sys.id].allergies}
                        onChange={handleChange}
                        minRows={3}
                      />
                    </Stack>
                  )}
                </Stack>
              ))}
              <Box width="100%" alignContent="center">
                {dirty && (
                  <LoadingButton
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    type="submit"
                    // fullWidth={false}
                    variant="outlined"
                    // size="large"
                    startIcon={<SendIcon />}
                    loading={isSubmitting}
                  >
                    Submit response
                  </LoadingButton>
                )}
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
