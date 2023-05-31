import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { tokens } from "../theme";

const Create = ({ genre, name, link }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor: colors.blueAccent[600],
        width: "fit-content",
        borderRadius: "10px",
      }}
    >
      <Link to={link}>
        <Button sx={{ fontSize: "16px" }}>Créer {name}</Button>
      </Link>
    </Box>
  );
};

export default Create;
