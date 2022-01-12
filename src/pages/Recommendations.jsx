import { Box, Button, Stack, Typography } from "@mui/material";
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
  const [songSuggestions, setSongSuggestions] = useState([]);
  const [honeymoonSuggestions, setHoneymoonSuggestions] = useState([]);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const confettiRef = useRef(null);

  // const getSongSuggestions = async () => {
  //   const response = await getSongSuggestionsForUser(user?.sys.id);
  //   console.log(response);
  //   const suggestions = response.map(
  //     (suggestion) => suggestion.fields.suggestion
  //   );
  //   setSongSuggestions(suggestions);
  // };

  // const getHoneymoonSuggestions = async () => {
  //   const response = await getHoneymoonSuggestionsForUser(user?.sys.id);
  //   // console.log(response);
  //   const suggestions = response.map(
  //     (suggestion) => suggestion.fields.suggestion
  //   );

  //   setHoneymoonSuggestions(suggestions);
  // };

  // useEffect(() => {
  //   if (user) {
  //     getSongSuggestions();
  //     getHoneymoonSuggestions();
  //   }
  // }, [user]);

  return (
    <Box>
      <Typography variant="h1" mb={4}>
        Recommendations
      </Typography>
      <Typography textAlign="center" variant="body1">
        We would love to hear from you!
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          songSuggestions: [],
          honeymoonSuggestions: [],
        }}
        onSubmit={async (values, { resetForm }) => {
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
          setSubmitted(true);

          // shoot confetti
          confettiRef?.current?.rewardMe();

          resetForm({
            values: {
              songSuggestions: [],
              honeymoonSuggestions: [],
            },
          });
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
          const handleAddSuggestion = (fieldName, suggestion) => {
            setFieldValue(fieldName, [...values[fieldName], suggestion]);
          };
          const handleRemoveSuggestion = (fieldName, suggestion) => {
            setFieldValue(fieldName, [
              ...values[fieldName].filter((s) => s !== suggestion),
            ]);
          };

          return (
            <Form>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Stack
                  my={4}
                  spacing={4}
                  width="50%"
                  sx={{ textAlign: "left" }}
                >
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
                  <Box width="50%" alignContent="center">
                    <Confetti ref={confettiRef} type="memphis">
                      {isSubmitted && !dirty ? (
                        <Button
                          color="success"
                          // variant="contained"
                          // startIcon={<DoneIcon />}
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
                            // variant="contained"
                            size="large"
                            // startIcon={<SendIcon />}
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
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Recommendations;
