import React from "react";

import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useContext, useRef } from "react";
import {
  createHoneymoonSuggestion,
  createSongSuggestion,
} from "../client/client";
import { Confetti } from "../components/Confetti/Confetti";
import { SuggestionField } from "../components/SuggestionField/SuggestionField";
import { AuthContext } from "../handlers/AuthHandler";

const Recommendations = () => {
  const { user } = useContext(AuthContext);

  const confettiRef = useRef(null);

  const onSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    setSubmitting(true);
    await Promise.all(
      values.songSuggestions.map(async (suggestion) => {
        return createSongSuggestion(user.sys.id, suggestion);
      })
    );
    await Promise.all(
      values.honeymoonSuggestions.map(async (suggestion) => {
        return createHoneymoonSuggestion(user.sys.id, suggestion);
      })
    );

    setSubmitting(false);

    // shoot confetti
    confettiRef?.current?.rewardMe();

    resetForm({});

    setStatus({ success: true });
  };

  return (
    <Container maxWidth="sm" textAlign="left">
      <Formik
        initialValues={{
          songSuggestions: [],
          honeymoonSuggestions: [],
        }}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          values,
          dirty,
          isSubmitting,
          setFieldValue,
          status,
        }) => {
          const handleAddSuggestion = (fieldName, suggestion) => {
            setFieldValue(fieldName, [...values[fieldName], suggestion]);
          };
          const handleRemoveSuggestion = (fieldName, suggestion) => {
            setFieldValue(fieldName, [
              ...values[fieldName].filter((s) => s !== suggestion),
            ]);
          };

          return (
            <Form onSubmit={handleSubmit}>
              <Stack mb={2} spacing={6} sx={{ textAlign: "left" }}>
                <Stack spacing={2}>
                  <Typography sx={{ fontWeight: "bold" }}>Music</Typography>
                  <Typography textAlign="left" variant="body1">
                    What would get you up and dancing?
                  </Typography>
                  <SuggestionField
                    name="songSuggestions"
                    suggestions={values.songSuggestions}
                    label="Song - Artist"
                    icon={<QueueMusicIcon />}
                    handleAdd={handleAddSuggestion}
                    handleRemove={handleRemoveSuggestion}
                  />
                </Stack>
                <Stack spacing={2}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Honeymoon destinations
                  </Typography>
                  <Typography textAlign="left" variant="body1">
                    Where should we go? Name your favorite place that
                    you&apos;ve explored.
                  </Typography>
                  <SuggestionField
                    name="honeymoonSuggestions"
                    suggestions={values.honeymoonSuggestions}
                    label="Destination, Country"
                    icon={<AirplaneTicketIcon />}
                    handleAdd={handleAddSuggestion}
                    handleRemove={handleRemoveSuggestion}
                  />
                </Stack>
                <Box width="max-content" textAlign={"center"}>
                  <Confetti ref={confettiRef} type="memphis">
                    {status?.success && !dirty ? (
                      <Button variant="outlined" size="large" type="button">
                        Submitted
                      </Button>
                    ) : (
                      dirty && (
                        <LoadingButton
                          disabled={isSubmitting}
                          type="submit"
                          variant="outlined"
                          size="large"
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
    </Container>
  );
};

export default Recommendations;
