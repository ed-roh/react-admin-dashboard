import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import Axios from "../axios/axios";
import Header from "./Header";
import { tokens } from "../theme";

const CreateCategorie = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [categorie, setCategorie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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
      await Axios.post(`categorie`, categorie).then(() => {
        setError(false);
        setSuccess(true);
        clearInputs();
      });
    } catch (error) {
      console.log(error);
      setError(true);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box ml={5}>
      <Header
        title={"Formulaire création catégorie"}
        subtitle={"Veuillez remplir les champs"}
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
          variant="filled"
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
          variant="filled"
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
          <Alert
            variant="outlined"
            severity="error"
            sx={{
              marginTop: "10px",
              width: "fit-content",
            }}
          >
            <p>Vous avez des erreurs, veuillez vérifier les champs</p>
          </Alert>
        )}
        {success && (
          <Alert
            variant="outlined"
            severity="success"
            sx={{
              marginTop: "10px",
              width: "fit-content",
            }}
          >
            <p>Catégorie ajouté avec succès</p>
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default CreateCategorie;
