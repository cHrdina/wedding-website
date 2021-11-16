import React from "react";

import { useFormik } from "formik";

import { Input, InputLabel } from "@mui/material";
import { Button, FormControl, TextField } from "@material-ui/core";

export const LoginForm = ({onSubmit}) => {

  const {handleSubmit, handleChange, onChange, values} = useFormik({
    initialValues: {
      password: ""
    },
    onSubmit: values => {
      console.log(values);
      onSubmit(values.password)
    },
    onChange: values => {
      console.log(values.password)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      
      
      <TextField size="medium" value={values.password} onChange={handleChange} label="Password" className="password-input" name="password" type="password" />
      
      <Button type="submit">Login</Button>
    </form>
  )

}