import React from "react";

import { useFormik } from "formik";

import { Stack, Typography, Box } from "@mui/material";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import * as Yup from "yup";

const LoadingIndicator = () => (
  <Box sx={{ display: "flex", flexWrap: "nowrap" }}>here we go...</Box>
);

const PasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const LoginForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
    errors,
    setFieldError,
  } = useFormik({
    validationSchema: PasswordValidationSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await onSubmit(values);
      } catch (e) {
        setFieldError("password", e.message);
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <form>
      <Stack spacing={4} alignItems="center">
        <Stack spacing={2}>
          <Typography variant="h5">Enter your password</Typography>
          <TextField
            size="medium"
            value={values.password}
            onChange={handleChange}
            label=""
            name="password"
            variant="standard"
            autoFocus
            inputProps={{ autoCapitalize: "off" }}
            error={!!errors?.password}
            helperText={errors?.password}
          />
        </Stack>
        <LoadingButton
          disabled={isSubmitting}
          onClick={handleSubmit}
          type="submit"
          variant="outlined"
          loading={isSubmitting}
          loadingIndicator={<LoadingIndicator />}
          sx={{
            textTransform: "none",
            px: 13,
          }}
        >
          let&apos;s go
        </LoadingButton>
      </Stack>
    </form>
  );
};
