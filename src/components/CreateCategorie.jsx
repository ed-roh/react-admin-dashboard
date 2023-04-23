import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { tokens } from "../theme";

const CreateCategorie = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [categorie, setCategorie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const clearInputs = () => {
    setCategorie(null);
  };

  const uploadImage = (image) => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "qbftnsbx");

    axios
      .post("https://api.cloudinary.com/v1_1/dgk4dzdqu/image/upload", formData)
      .then((res) => {
        setCategorie((prev) => ({
          ...prev,
          image_categorie: res.data.secure_url,
        }));
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}categorie`, categorie);

      clearInputs();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box ml={5}>
      <Header
        title={"Formulaire creation categorie"}
        subtitle={"Veuillez remplez les champs"}
      />
      <Box>
        {/* Nom Categorie */}
        <Typography variant="h3" sx={{ margin: "15px 0px 5px 0" }}>
          Nom Categorie
        </Typography>
        <TextField
          required
          name="nom_categorie"
          value={categorie?.nom_categorie || ""}
          onChange={(e) => {
            setCategorie((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
        />
        {/* Description */}
        <Typography variant="h3" sx={{ margin: "15px 0px 5px 0  " }}>
          Description
        </Typography>
        <TextField
          required
          name="description"
          value={categorie?.description || ""}
          onChange={(e) => {
            setCategorie((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
        />
        {/* Image */}
        <Typography variant="h3" sx={{ margin: "15px 0px 5px 0  " }}>
          Image
        </Typography>
        <TextField
          type="file"
          onChange={(e) => {
            uploadImage(e.target.files);
          }}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        />

        <Box
          sx={{
            backgroundColor: colors.greenAccent[600],
            width: "fit-content",
            mt: "20px",
          }}
        >
          <Button
            type="submit"
            onClick={handleSubmit}
            sx={{ fontSize: "16px", width: "200px", height: "40px" }}
            disabled={
              !categorie?.image_categorie ||
              !categorie?.nom_categorie ||
              !categorie?.description
            }
          >
            {loading ? <CircularProgress size={24} /> : "Enregistrer"}
          </Button>
        </Box>
        {error && (
          <Typography
            variant="h4"
            sx={{ margin: "15px 0px 5px 0", color: colors.redAccent[600] }}
          >
            Problème dans la connexion, Veuillez réessayer.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CreateCategorie;
