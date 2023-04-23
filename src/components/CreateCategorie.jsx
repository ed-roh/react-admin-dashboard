import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import Header from "./Header";

const CreateCategorie = () => {
  return (
    <Box ml={5}>
      <Header
        title={"Formulaire creation categorie"}
        subtitle={"Veuillez remplez les champs"}
      />
      <Box>
        <Typography variant="h3" sx={{ margin: "15px 0px 5px 0" }}>
          Nom Categorie
        </Typography>
        <TextField required></TextField>
        <Typography variant="h3" sx={{ margin: "15px 0px 5px 0  " }}>
          Description
        </Typography>
        <TextField required></TextField>
      </Box>
    </Box>
  );
};

export default CreateCategorie;
