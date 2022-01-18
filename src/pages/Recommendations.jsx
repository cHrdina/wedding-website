import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { SuggestionField } from "../components/SuggestionField/SuggestionField";

import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  createSongSuggestion,
  createHoneymoonSuggestion,
  getHoneymoonSuggestionsForUser,
  getSongSuggestionsForUser,
} from "../client/client";
import { AuthContext } from "../handlers/AuthHandler";
import { Form, Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { Confetti } from "../components/Confetti/Confetti";

const Recommendations = () => {
  const { user } = useContext(AuthContext);

  const confettiRef = useRef(null);

  const onSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    // console.log(values);
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
    <Container maxWidth="sm" textAlign="center">
      {/* <Box sx={{ display: "flex", justifyContent: "center", mx: 2 }}> */}
      <Typography textAlign="left" variant="body1">
        We would love to hear from you!
      </Typography>
      <Formik
        // enableReinitialize
        initialValues={{
          songSuggestions: [],
          honeymoonSuggestions: [],
        }}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          onChange,
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
              <Stack my={4} spacing={4} sx={{ textAlign: "left" }}>
                <Stack spacing={2}>
                  <Typography variant="body1">
                    <b>Music</b>
                  </Typography>
                  <Typography variant="body1">
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
                  <Typography variant="body1">
                    <b>Honeymoon destinations</b>
                  </Typography>
                  <Typography variant="body1">
                    Where should we go? Name your favorite place that you've
                    explored.
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
                      <Button
                        color="success"
                        variant="outlined"
                        size="large"
                        // startIcon={<DoneIcon />}
                        type="button"
                      >
                        Submitted
                      </Button>
                    ) : (
                      dirty && (
                        <LoadingButton
                          disabled={isSubmitting}
                          type="submit"
                          variant="outlined"
                          size="large"
                          // startIcon={<SendIcon />}
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
    // </Box>
  );
};

export default Recommendations;
