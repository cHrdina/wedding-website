import React from "react";

import { useFormik } from "formik";

import { Input, InputLabel } from "@mui/material";
import { Button, FormControl, TextField } from "@material-ui/core";

export const LoginForm = ({onSubmit, withUsername}) => {

  const {handleSubmit, handleChange, onChange, values} = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: values => {
      console.log(values);
      onSubmit(values)
    },
    onChange: values => {
      console.log(values.password)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      
     { withUsername && <TextField size="medium" value={values.username} onChange={handleChange} label="Username" name="username" type="text" />}
      
      <TextField size="medium" value={values.password} onChange={handleChange} label="Password" className="password-input" name="password" type="password" />
      
      <Button type="submit">Login</Button>
    </form>
  )

}