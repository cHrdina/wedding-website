import React, { useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@mui/system";
import { Form, Formik, useFormik } from "formik";

import { RsvpToggleButton } from "./RsvpToggleButton";
import { AuthContext } from "../../handlers/AuthHandler";
import { DietaryRequirementsSection } from "./DietaryRequirements";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const RsvpForm = ({ users, onSubmit }) => {
  const { updateUser } = useContext(AuthContext);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const history = useHistory();

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
          setSubmitting(true);
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

          try {
            await Promise.all(
              updates?.map(async ({ userId, updates }) => {
                return updateUser(userId, updates);
              })
            );
            setSubmitting(false);
            setSubmitted(true);

            await sleep(3000);
            history.push("/program");
          } catch (e) {
            throw e;
          }
        }}
      >
        {({ handleSubmit, handleChange, onChange, values, dirty }) => (
          <Form>
            <Stack spacing={4} mb={4} divider={<Divider />}>
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
              <Box width="50%" alignContent="center">
                {isSubmitted ? (
                  <Button
                    color="success"
                    variant="contained"
                    startIcon={<DoneIcon />}
                    fullWidth
                  >
                    Submitted
                  </Button>
                ) : (
                  dirty && (
                    <LoadingButton
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      type="submit"
                      variant="contained"
                      startIcon={<SendIcon />}
                      loading={isSubmitting}
                      loadingIndicator="Submitting..."
                      fullWidth
                    >
                      Submit response
                    </LoadingButton>
                  )
                )}
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
