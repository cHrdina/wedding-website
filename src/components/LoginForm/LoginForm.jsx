import React, { useState } from "react";

import { Form, useFormik } from "formik";

import { Input, InputLabel, Stack, Typography, Box } from "@mui/material";
import { FormControl, TextField } from "@mui/material";
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

export const LoginForm = ({ onSubmit, withUsername }) => {
  const {
    handleSubmit,
    handleChange,
    onChange,
    values,
    isSubmitting,
    errors,
    vali,
  } = useFormik({
    validationSchema: PasswordValidationSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      try {
        onSubmit(values);
      } catch (e) {}
    },
    onChange: (values) => {
      console.log(values.password);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <form>
      <Stack spacing={4} alignItems="center">
        <Stack spacing={2}>
          {/* {withUsername && (
            <TextField
              size="medium"
              value={values.username}
              onChange={handleChange}
              label="Username"
              name="username"
              type="text"
              variant="standard"
            />
          )} */}

          <Typography fontSize="2rem">Enter your password</Typography>
          <TextField
            size="medium"
            value={values.password}
            onChange={handleChange}
            label=""
            className="password-input"
            name="password"
            variant="standard"
            autoFocus
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
            px: 10,
          }}
        >
          let's go
        </LoadingButton>
      </Stack>
    </form>
  );
};
