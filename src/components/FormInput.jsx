import { TextField, Typography } from "@mui/material";
import React from "react";

const FormInput = ({ text, name, value, onChange, type }) => {
  return (
    <>
      <Typography variant="h3" sx={{ margin: "15px 0px 5px 0px" }}>
        {text}
      </Typography>
      <TextField
        required
        variant="filled"
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    </>
  );
};

export default FormInput;
