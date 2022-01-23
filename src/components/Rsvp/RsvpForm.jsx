import React, { useContext, useMemo, useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";

import { RsvpToggleButton } from "./RsvpToggleButton";
import { AuthContext } from "../../handlers/AuthHandler";
import { DietaryRequirementsSection } from "./DietaryRequirements";
import { Stack } from "@mui/material";
import { Confetti } from "../Confetti/Confetti";

// const sleep = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

export const RsvpForm = ({ users }) => {
  const { updateUser } = useContext(AuthContext);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const confettiRef = useRef(null);

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
    <Box>
      <Stack spacing={2} mb={4}>
        <Typography variant="h5">Will you be attending our wedding?</Typography>
        <Typography variant="subtitle1">
          Please respond by Friday, 11 February 2022
        </Typography>
      </Stack>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
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

          await Promise.all(
            updates?.map(async ({ userId, updates }) => {
              return updateUser(userId, updates);
            })
          );
          setSubmitting(false);
          setSubmitted(true);

          // shoot confetti
          confettiRef?.current?.rewardMe();

          resetForm({
            values,
          });
        }}
      >
        {({ handleSubmit, handleChange, values, dirty, setFieldValue }) => {
          const handleRsvpStatusChange = (fieldName, rsvpStatus) => {
            setFieldValue(fieldName, rsvpStatus);
          };

          return (
            <Form>
              <Stack
                spacing={6}

                // divider={<Divider />}
              >
                {users.map((user, key) => (
                  <Stack key={key} spacing={2}>
                    <Typography variant="body1" fontSize={"1rem"}>
                      <b>
                        {user.fields.firstName} {user.fields.lastName}
                      </b>
                    </Typography>
                    <Stack key={key} spacing={1}>
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
                  </Stack>
                ))}
                <Box width="max-content" textAlign={"center"}>
                  <Confetti ref={confettiRef}>
                    {isSubmitted && !dirty ? (
                      <Button
                        variant="outlined"
                        startIcon={<DoneIcon />}
                        type="button"
                        size="large"
                      >
                        Submitted
                      </Button>
                    ) : (
                      dirty && (
                        <LoadingButton
                          disabled={isSubmitting}
                          onClick={handleSubmit}
                          type="submit"
                          variant="outlined"
                          size="large"
                          startIcon={<SendIcon />}
                          loading={isSubmitting}
                          loadingIndicator="Submitting..."
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
    </Box>
  );
};
