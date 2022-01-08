import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@mui/material";
import { Form, Formik, useFormik } from "formik";

import { RsvpToggleButton } from "./RsvpToggleButton";
import { AuthContext } from "../../handlers/AuthHandler";
import { DietaryRequirementsSection } from "./DietaryRequirements";
import { Stack } from "@mui/material";
import { Confetti } from "../Confetti/Confetti";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const RsvpForm = ({ users, onSubmit }) => {
  const { updateUser } = useContext(AuthContext);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const confettiRef = useRef(null);

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
    <Stack spacing={4} mt={4}>
      <Typography variant="h5">Will you be attending our wedding?</Typography>

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

            // shoot confetti
            confettiRef?.current?.rewardMe();

            // await sleep(3000);
            // history.push("/program");
          } catch (e) {
            throw e;
          }
        }}
      >
        {({
          handleSubmit,
          handleChange,
          onChange,
          values,
          dirty,
          setFieldValue,
        }) => {
          const handleRsvpStatusChange = (fieldName, rsvpStatus) => {
            setFieldValue(fieldName, rsvpStatus);
          };

          return (
            <Form>
              <Stack spacing={4} mb={4} divider={<Divider />}>
                {users.map((user, key) => (
                  <Stack key={key} spacing={2}>
                    <Typography mb={2} variant="body1" fontSize={"1.5rem"}>
                      <b>{user.fields.firstName}</b>
                    </Typography>
                    <RsvpToggleButton
                      name={`${user.sys.id}.rsvpStatus`}
                      value={values[user.sys.id].rsvpStatus}
                      onChange={handleRsvpStatusChange}
                    />

                    {values[user.sys.id].rsvpStatus === "attending" && (
                      <Stack spacing={4}>
                        <DietaryRequirementsSection
                          onChange={handleChange}
                          user={user}
                          values={values[user.sys.id]}
                          setFieldValue={setFieldValue}
                        />
                      </Stack>
                    )}
                  </Stack>
                ))}
                <Box width="50%" alignContent="center">
                  <Confetti ref={confettiRef}>
                    {isSubmitted && !dirty ? (
                      <Button
                        color="success"
                        variant="contained"
                        startIcon={<DoneIcon />}
                        type="button"
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
                          size="large"
                          startIcon={<SendIcon />}
                          loading={isSubmitting}
                          loadingIndicator="Submitting..."
                          fullWidth
                        >
                          Submit response
                        </LoadingButton>
                      )
                    )}
                  </Confetti>
                </Box>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
};
